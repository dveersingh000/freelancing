const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String },
    workPassStatus: { type: String },
    otp: { type: String },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
});

// Check if the model already exists before compiling
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
