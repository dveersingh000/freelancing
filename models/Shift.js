const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  vacancy: { type: Number, required: false },
  standbyVacancy: { type: Number },
  duration: { type: Number, required: false },
  breakHours: { type: Number },
  breakType: { type: String, enum: ['Paid', 'Unpaid'], required: false },
  rateType: { type: String, enum: ['Flat rate', 'Hourly'], required: false },
  payRate: { type: Number, required: false },
  totalWage: { type: Number, required: false },
});

module.exports = mongoose.model('Shift', shiftSchema);
