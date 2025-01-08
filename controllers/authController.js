const User = require('../models/User');
const { verifyOTP, sendOTP } = require('../utils/otpUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP using Twilio
    const isValidOtp = await verifyOTP(phoneNumber, otp);
    if (!isValidOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id });

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
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
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // Validate fields for new users
      // if (!phoneNumber || !fullName || !email || !employmentStatus) {
      //   return res.status(400).json({
      //     message: 'User not registered. Full name, email, employment status, and phone number are required.',
      //   });
      // }

      // Create new user if not exists
      user = new User({ phoneNumber, fullName, email, employmentStatus });
    }

    // Send OTP using Twilio
    const otpStatus = await sendOTP(phoneNumber);
    if (otpStatus !== 'pending') {
      return res.status(500).json({ message: 'Failed to send OTP. Try again later.' });
    }

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send OTP using Twilio
    const otpStatus = await sendOTP(phoneNumber);
    if (otpStatus !== 'pending') {
      return res.status(500).json({ message: 'Failed to resend OTP. Try again later.' });
    }

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error resending OTP:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, phoneNumber, email, employmentStatus, otp } = req.body;
  // console.log(req.body);

  try {
    const ifUserExists = await User.findOne({ phoneNumber });
    if (ifUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Verify OTP using Twilio
    const isValidOtp = await verifyOTP(phoneNumber, otp);
    if (!isValidOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = new User({ fullName, phoneNumber, email, employmentStatus });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.'});

  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

