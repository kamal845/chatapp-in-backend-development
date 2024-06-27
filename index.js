const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path=require('path');
const userRoute=require('./routes/userRoute');
const connectionURL = require("./database/database");
const PORT = process.env.PORT || 4000;
app.use('/', userRoute);

  const http=require('http').Server(app);
  http.listen(PORT,function(){
    console.log('server is started');
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(express.static('public'));
  app.set('view engine','ejs');
app.set('views', './views');