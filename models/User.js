const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    employmentStatus: { type: String, required: true },
    profilePicture: {
      type: String,
      default: 'http://localhost:3000/static/images/image.png', // Use your hosted URL
    },
    // role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
