const User = require('../models/User');
const { generateOTP, verifyOTP } = require('../utils/otpUtils');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Validate input
    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    // Find user
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate token
    const token = generateToken({ id: user._id });

    // Reset OTP after successful login
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Respond with token
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Generate OTP
exports.generateOtp = async (req, res) => {
  const { phoneNumber, fullName, email, employmentStatus } = req.body;

  try {

    // Check if the user already exists in the database
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // If user doesn't exist, create a new user with the provided data
      // Validate that all necessary fields are provided
      if (!phoneNumber || !fullName || !email || !employmentStatus) {
        return res.status(400).json({
          message: 'User not registered. Full name, email, employment status, and phone number are required.'
        });
      }
      user = new User({
        phoneNumber,
        fullName,
        email,
        employmentStatus
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    // Save user or update existing user with OTP
    await user.save();

    // Send OTP to the user (e.g., via SMS or email)
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.status(200).json({
      message: 'OTP sent successfully.',
      otp: otp  // Return OTP in the response for testing or debugging
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, phoneNumber, email, employmentStatus, otp } = req.body;
  // console.log(req.body);

  try {
    // console.log('Register request received:', req.body);

    // Check if the user exists based on phoneNumber
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      console.error('User not found for phoneNumber:', phoneNumber);
      return res.status(404).json({ message: 'User not found. Please generate an OTP first.' });
    }

    // console.log('User found:', user);

    // Verify OTP
    if (!verifyOTP(otp, user.otp, user.otpExpiry)) {
      console.error('Invalid or expired OTP:', { otp, userOtp: user.otp, userOtpExpiry: user.otpExpiry });
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Update user details
    user.fullName = fullName;
    user.email = email;
    user.employmentStatus = employmentStatus;
    user.otp = null; // Clear OTP after successful verification
    user.otpExpiry = null;

    // Save updated user to the database
    await user.save();
    console.log('User updated successfully:', user);

    // Respond with success message
    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        employmentStatus: user.employmentStatus,
      },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP to user (e.g., SMS or Email)
    console.log(`New OTP for ${phoneNumber}: ${otp}`);

    res.status(200).json({
      message: 'OTP sent successfully.',
      otp: otp  // Include OTP in the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
