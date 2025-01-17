const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  shiftId: { type: mongoose.Schema.Types.ObjectId, required: true },
  clockIn: { type: Date },
  clockOut: { type: Date },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
