const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path=require('path');
const userRoute=require('./routes/userRoute');
const connectDB = require("./database/database");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;
app.use('/', userRoute);

  const http=require('http').Server(app);
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
  app.use(express.static('public'));
  app.set('view engine','ejs');
app.set('views', './views');