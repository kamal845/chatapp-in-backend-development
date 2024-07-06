const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path=require('path');
const chatModel=require('./model/chatModel');
const userRoute=require('./routes/userRoute');
const userController=require('./controller/userController');
const connectDB = require("./database/database");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views', './views');
const PORT = process.env.PORT || 4000;
app.use('/', userRoute);
  const http=require('http').Server(app);
//   const io=require('socket.io')(http);
  try {
    http.listen(PORT, async () => {
        try {
            await connectDB();
            console.log('Database is connected successfully');
            console.log('Server is started on port', PORT);
        } catch (error) {
            console.log('Error connecting to the database:', error);
        }
    });
} catch (error) {
    console.log('Error:', error);
}

// Server-side (e.g., in your main server file)
const io = require('socket.io')(http);

io.of('/user-namespace').on('connection', (socket) => {
    console.log('User connected:', socket.id);

    const userId = socket.handshake.auth.token;
    socket.join(userId); // User joins their own room based on user ID

    socket.on('chat message', async (data) => {
        try {
            await chatModel.create(data);
            io.of('/user-namespace').to(data.receiver_id).emit('chat message', data); // Emit to receiver
            socket.emit('chat message', data); // Emit to sender as well
        } catch (error) {
            console.error('Error saving chat message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
