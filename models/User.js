const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  employmentStatus: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
});

module.exports = mongoose.model('User', userSchema);
