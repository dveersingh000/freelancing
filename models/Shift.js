// models/shiftModel.js
const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  date: { type: Date, required: true },
  available: { type: Boolean, default: true },
  shiftStartTime: { type: String }, // Added to track shift start time
  shiftEndTime: { type: String },   // Added to track shift end time
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // To track applied users
});

module.exports = mongoose.model('Shift', shiftSchema);