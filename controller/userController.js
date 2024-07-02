const mongoose = require("mongoose");
const userModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
// module.exports = {
//   user: async (req, res) => {
//     console.log("Request:", req);
//     console.log("Uploaded File:", req.file);

//     try {
//       console.log("Request body:", req.body);
//       const signupData = {
//         name: req.body.name,
//         email: req.body.email,
//         image: "images/" + req.file.filename,
//         password: req.body.password,
//       };
//       console.log("Signup data:", signupData);

//       const existingUser = await userModel.findOne({ email: signupData.email });
//       if (existingUser) {
//         return res.status(400).json({
//           status: "error",
//           message: "Email already exists",
//         });
//       }

//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(signupData.password, saltRounds);
//       signupData.password = hashedPassword;

//       const signups = await userModel.create(signupData);
//       res.status(201).json({
//         status: "success",
//         message: "Data is created successfully",
//         data: signups,
//       });
//       return res.render("user");
//     } catch (error) {
//       console.error("Error during signup:", error);
//       res.status(500).json({
//         status: "error",
//         message: "Internal server error",
//         data: "No data found",
//       });
//     }
//   },
//   loadLogin: async (req, res) => {
//     try {
//       res.render("login");
//     } catch (error) {
//         console.log("Error in loadLogin:", error);
//     }
//   },
// //   Login: async (req, res) => {
// //     try {
// //       const email = req.body.email;
// //       const password = req.body.password;
// //       const userData = await userModel.findOne({ email: email });
// //       if (userData) {
// //         const passwordMatch = bcrypt.compare(password, userData.password);
// //         if (passwordMatch) {
// //           req.session.user = userData;
// //           res.redirect("/dashboard");
// //         } else {
// //           res.render("login", {
// //             message: "email and password is incorrect !!",
// //           });
// //         }
// //       } else {
// //         res.render("login", { message: "email and password is incorrect !!" });
// //       }
// //       res.render("login");
// //     } catch (error) {
// //       console.log("error");
// //     }
// //   },
// Login: async (req, res) => {
//     try {
//       const email = req.body.email;
//       const password = req.body.password;
//       const userData = await userModel.findOne({ email: email });
//       if (userData) {
//         const passwordMatch = await bcrypt.compare(password, userData.password); // await जोड़ें
//         if (passwordMatch) {
//           req.session.user = userData;
//           res.redirect("/dashboard");
//         } else {
//           res.render("login", {
//             message: "Email और पासवर्ड गलत है !!",
//           });
//         }
//       } else {
//         res.render("login", { message: "Email और पासवर्ड गलत है !!" });
//       }
//     } catch (error) {
//       console.log("error");
//       res.render("login", { message: "लॉगिन के दौरान त्रुटि हुई। कृपया पुन: प्रयास करें।" }); // एरर मैसेज जोड़ें
//     }
//   },
//   logout: async (req, res) => {
//     try {
//       req.session.destroy();
//       res.redirect("/");
//     } catch (error) {
//       console.log("error");
//     }
//   },
//   loadDashboard: async (req, res) => {
//     try {
//       res.render("dashboard", { user: req.session.user });
//     } catch (error) {
//       console.log("error");
//     }
//   },
// };





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
      res.render("dashboard", { user: req.session.user });
    } catch (error) {
      console.log("Error in loadDashboard:", error);
    }
  },
};
