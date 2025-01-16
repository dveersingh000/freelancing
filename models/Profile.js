const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  nricOrFinNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  postalCode: { type: String, required: true },
  images: {
    selfie: { type: String, required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    ploc: { type: String }, // for LTVP
    studentCard: { type: String }, // for Student
  },
  extraFields: {
    student: {
      studentId: { type: String },
      schoolName: { type: String },
    },
    ltvp: {
      plocExpiryDate: { type: Date },
    },
  },
});

module.exports = mongoose.model("Profile", profileSchema);
