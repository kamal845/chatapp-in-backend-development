const mongoose = require("mongoose");
const userModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const chatModel = require("../model/chatModel");

module.exports = {
    user: async (req, res) => {
        console.log("Request:", req);
        console.log("Uploaded File:", req.file);

        try {
            console.log("Request body:", req.body);
            const signupData = {
                name: req.body.name,
                email: req.body.email,
                image: "images/" + req.file.filename,
                password: req.body.password,
            };
            console.log("Signup data:", signupData);

            const existingUser = await userModel.findOne({ email: signupData.email });
            if (existingUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Email already exists",
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(signupData.password, saltRounds);
            signupData.password = hashedPassword;

            const signups = await userModel.create(signupData);
            res.status(201).json({
                status: "success",
                message: "Data is created successfully",
                data: signups,
            });
            return res.render("user");
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({
                status: "error",
                message: "Internal server error",
                data: "No data found",
            });
        }
    },
    userLoad: async (req, res) => {
        try {
            res.render('user');
        } catch (error) {
            console.log('error');
        }
    },
    loadLogin: async (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            console.log("Error in loadLogin:", error);
        }
    },
    Login: async (req, res) => {
        console.log("Request body:", req.body); // Check if body is received
        try {
            const email = req.body.email;
            const password = req.body.password;

            // Additional debug logs
            console.log("Received Email:", email);
            console.log("Received Password:", password);

            if (!email || !password) {
                console.log("Missing email or password");
                return res.render("login", { message: "Email और पासवर्ड की आवश्यकता है !!" });
            }

            const userData = await userModel.findOne({ email: email });
            if (userData) {
                const passwordMatch = await bcrypt.compare(password, userData.password);
                if (passwordMatch) {
                    req.session.user = userData;
                    res.redirect("/dashboard");
                } else {
                    res.render("login", { message: "Email & Password incorrect !!" });
                }
            } else {
                res.render("login", { message: "Email & Password incorrect" });
            }
        } catch (error) {
            console.log("Error in Login:", error);
            res.render("login", { message: "An error occurred while logging in. Please try again." });
        }
    },
    logout: async (req, res) => {
        try {
            req.session.destroy();
            res.redirect("/");
        } catch (error) {
            console.log("Error in logout:", error);
        }
    },
    loadDashboard: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }

            const users = await userModel.find({ _id: { $nin: [req.session.user._id] } });
            res.render("dashboard", { user: req.session.user, users: users });
        } catch (error) {
            console.log("Error in loadDashboard:", error);
            res.status(500).send("An error occurred while loading the dashboard");
        }
    },
    getChatHistory: async (req, res) => {
        try {
            const senderId = req.session.user._id;
            const receiverId = req.params.receiverId;
            const chatHistory = await chatModel.find({
                $or: [
                    { sender_id: senderId, receiver_id: receiverId, deleted: false },
                    { sender_id: receiverId, receiver_id: senderId, deleted: false }
                ]
            }).sort({ createdAt: 1 });
            res.json(chatHistory);
        } catch (error) {
            console.error("Error fetching chat history:", error);
            res.status(500).json({ error: "Failed to fetch chat history" });
        }
    },
    saveMessage: async (req, res) => {
        try {
            const messageId = req.params.id;
            await chatModel.findByIdAndUpdate(messageId, { saved: true });
            res.status(200).send({ success: true });
        } catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    },
    deleteMessage: async (req, res) => {
        try {
            const messageId = req.params.id;
            await chatModel.findByIdAndUpdate(messageId, { deleted: true });
            res.status(200).send({ success: true });
        } catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    },
    saveChatMessage: async (data) => {
        try {
            const chatMessage = new chatModel(data);
            await chatMessage.save();
        } catch (error) {
            console.error("Error saving chat message:", error);
        }
    }
};