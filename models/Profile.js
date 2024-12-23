const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nric: { type: String },
  dob: { type: Date },
  postalCode: { type: String },
  gender: { type: String, enum: ['Male', 'Female'] },
  nricImages: {
    front: { type: String },
    back: { type: String }
  },
  plocImage: { type: String },
  plocExpiryDate: { type: Date },
  foodHygieneCert: { type: String },
  studentPassImage: { type: String },
  school: { type: String },
  studentId: { type: String },
  isProfileApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Profile', profileSchema);