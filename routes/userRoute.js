const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,'../public/images'));  
    },
    filename:function(req,file,cb){
        const name=Date.now()+ '-' +file.originalname;
        cb(null,name);
    }
});
const upload=multer({storage:storage});
const userController=require('../controller/userController');
router.get('/user', (req, res) => {
  res.render('user', { message: null });
});
router.post('/user',upload.single('image'),userController.user);

module.exports=router;


// <% if (message) { %>
//   <p><%= message %></p>
// <% } %>