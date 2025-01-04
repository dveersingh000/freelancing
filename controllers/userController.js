const User = require('../models/User');
const { generateOTP, verifyOTP, sendOTP } = require('../utils/otpUtils');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, workPassStatus, otp } = req.body;

    // Verify OTP
    // if (!verifyOTP(phoneNumber, otp)) {
    //   return res.status(400).json({ message: 'Invalid OTP' });
    // }

    const newUser = new User({ fullName, phoneNumber, email, workPassStatus });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.generateOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    await sendOTP(phoneNumber, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    await sendOTP(phoneNumber, otp);
    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const dotenv = require("dotenv");
// // const crypto = require("crypto");
// // const sendSms = require("../utils/sendSms"); 

// dotenv.config();

// // Register a new user
// exports.registerUser = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const ifUserExists = await User.findOne({ email });
//         if (ifUserExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword
//         });
//         await user.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error creating user", error });
//     }
// };

// // Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.status(200).json({ users });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users", error });
//     }
// };

// // Get user by email
// exports.getUserByEmail = async (req, res) => {
//     const { email } = req.params;
//     try {
//         const user = await User.findOne({ email }).select("-password");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching user", error });
//     }
// };

// // Login user
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Wrong email or password" });
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({ message: "Wrong email or password" });
//         }
//         const payload = { id: user._id };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in", error });
//     }
// };

// // Update user
// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, email, password } = req.body;
//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         if (name) user.name = name;
//         if (email) user.email = email;
//         if (password) user.password = await bcrypt.hash(password, 10);
//         await user.save();
//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user", error });
//     }
// };

// // exports.generateOtp = async (req, res) => {
// //     const { mobile } = req.body;
// //     try {
// //         const otp = crypto.randomInt(100000, 999999).toString();
// //         const hashedOtp = await bcrypt.hash(otp, 10);

// //         // Store hashed OTP and expiration time in the user's record
// //         let user = await User.findOne({ mobile });
// //         if (!user) {
// //             user = new User({ mobile });
// //         }
// //         user.otp = hashedOtp;
// //         user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
// //         await user.save();

// //         // Send OTP to the user's mobile number
// //         await sendSms(mobile, `Your OTP is ${otp}`);

// //         res.status(200).json({ message: "OTP sent successfully" });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error generating OTP", error });
// //     }
// // };

// // exports.verifyOtp = async (req, res) => {
// //     const { mobile, otp } = req.body;
// //     try {
// //         const user = await User.findOne({ mobile });
// //         if (!user || !user.otp) {
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }

// //         const isOtpValid = await bcrypt.compare(otp, user.otp);
// //         if (!isOtpValid || user.otpExpiry < Date.now()) {
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }

// //         // Clear OTP after successful verification
// //         user.otp = undefined;
// //         user.otpExpiry = undefined;
// //         await user.save();

// //         // Generate JWT token
// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //         res.status(200).json({ token, message: "OTP verified successfully" });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error verifying OTP", error });
// //     }
// // };

// // exports.registerUserWithOtp = async (req, res) => {
// //     const { name, mobile, email, otp } = req.body;
// //     try {
// //         const user = await User.findOne({ mobile });
// //         if (!user || !user.otp) {
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }

// //         const isOtpValid = await bcrypt.compare(otp, user.otp);
// //         if (!isOtpValid || user.otpExpiry < Date.now()) {
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }

// //         // Check if the user already exists
// //         if (user.isRegistered) {
// //             return res.status(400).json({ message: "User already registered" });
// //         }

// //         // Register user
// //         user.name = name;
// //         user.email = email;
// //         user.isRegistered = true; // Mark user as registered
// //         user.otp = undefined;
// //         user.otpExpiry = undefined;
// //         await user.save();

// //         // Generate JWT token
// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// //         res.status(201).json({ token, message: "User registered successfully" });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error registering user", error });
// //     }
// // };