// models/Shift.js
const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  job_id: String,
  user_id: String,
  status: String,
  start_time: Date,
  end_time: Date
});

module.exports = mongoose.model('Shift', shiftSchema);
