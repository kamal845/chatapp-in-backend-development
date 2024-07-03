const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const auth=require('../middleware/authMiddleware');
const session=require('express-session');
require('dotenv').config();
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    console.error('SESSION_SECRET is not defined in .env file');
    process.exit(1); // Exit the process if SESSION_SECRET is not set
}
router.use(session({secret:SESSION_SECRET}));
router.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true if using HTTPS
}));
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
//login
router.get('/login',auth.isLogout,userController.loadLogin);
router.post('/login',userController.Login);
router.get('/logout',auth.isLogin,userController.logout);
router.get('/dashboard',auth.isLogin,userController.loadDashboard);
router.get('*',function(req,res){
  res.redirect('/');
})
module.exports=router;