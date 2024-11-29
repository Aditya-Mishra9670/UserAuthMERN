import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const router = express.Router();

// POST request for Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
      console.log(username);
      console.log(email);
      console.log(password);
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
      // password:password
    });

    await newUser.save();
    console.log("Registration successful");
    return res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST request for Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required!" });
    }

    // Check if user exists
    const userExistance = await User.findOne({ email });
    if (!userExistance) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, userExistance.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: userExistance.username, id: userExistance._id },
      process.env.KEY,
      { expiresIn: "1h" }
    );

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      secure: process.env.NODE_ENV === "production", // Secure flag only for production
      sameSite: "Strict", // Ensure cookies are only sent for same-site requests
    });

    // Successful response
    return res.status(200).json({ status:true,message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST request for Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // Create a reset token
    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "5m" });

    // Set up the transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.EMAILPASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.MYEMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click on the following link to reset your password: https://Aditya-Mishra9670.github.io/resetPassword/${token}`
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Something went wrong", error });
      } else {
        return res.status(200).json({ message: "Password reset email sent", info: info.response });
      }
    });
  } catch (err) {
    console.error("Error in forgot-password route:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Middleware to verify the user
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; // Attach decoded data to the request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ status: false, message: "Unauthorized", error: err.message });
  }
};

// Protected route
router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});


// POST request to reset the password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body; // User submits their new password

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required!" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.KEY);
    if(!decoded){
      return res.status(401).json({message:"Your pasword Reset session expired!"});
    }
    // Find the user based on the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ status: true });
});

export const UserRouter = router;
