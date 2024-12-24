// models/ShiftApplication.js
const mongoose = require('mongoose');

const shiftApplicationSchema = new mongoose.Schema({
  job_id: String,
  user_id: String,
  shift_id: String,
  application_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShiftApplication', shiftApplicationSchema);
