const crypto = require('crypto');

let otpStore = {}; // Store OTPs temporarily for simplicity

exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

exports.sendOTP = async (phoneNumber, otp) => {
  otpStore[phoneNumber] = otp; // Store OTP
  console.log(`Sending OTP ${otp} to phone number ${phoneNumber}`);
};

exports.verifyOTP = (phoneNumber, otp) => {
  return otpStore[phoneNumber] === otp; // Verify OTP
};
