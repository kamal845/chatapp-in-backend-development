const mongoose = require("mongoose");
const userModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');

module.exports = {
    user: async (req, res) => {
        console.log('Request:', req);
        console.log('Uploaded File:', req.file);
        
        try {
            console.log("Request body:", req.body);  
            const signupData = {
                name: req.body.name,
                email: req.body.email,
                image: 'images/' + req.file.filename,
                password: req.body.password
            };
            console.log("Signup data:", signupData);

            const existingUser = await userModel.findOne({ email: signupData.email });
            if (existingUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Email already exists"
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(signupData.password, saltRounds);
            signupData.password = hashedPassword;

            const signups = await userModel.create(signupData);
            res.status(201).json({
                status: "success",
                message: "Data is created successfully",
                data: signups
            });
            return res.render('user');
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                data: "No data found"
            });
        }
    }
};
