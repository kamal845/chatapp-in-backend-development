const mongoose= require("mongoose");
const userModel=require('../model/UserModel');
const bcrypt=require('bcryptjs');
module.exports = {
    user: async (req, res) => {
        try {
const passwordHash=await bcrypt.hash(req.body.password,10);
const users=new User({
    name:req.body.name,
    email:req.body.email,
    image:'images/' + req.file.filename,
    email:req.body.email,
    password:passwordHash
});
await users.save();
           res.render('user',{message:"your registration successfully completed!!"});
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                statuscode: 500,
                status: "error",
                message: "Failed to retrieve bills",
                data: null
            });
        }
    }
  
};