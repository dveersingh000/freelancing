const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    employmentStatus: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
