const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path=require('path');
const userRoute=require('./routes/userRoute');
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
  const io=require('socket.io')(http);
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
var usp=io.of('/user-namespace');
usp.on('connection',function(socket){
    console.log('user connected');
    socket.on('disconnect',function(){
        console.log('user disconnected');
    });
});