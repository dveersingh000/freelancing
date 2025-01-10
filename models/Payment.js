const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  worker: {
    name: { type: String, required: true },
    nric: { type: String, required: true },
  },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  shiftId: { type: String, required: true },
  date: { type: Date, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  clockedIn: { type: String },
  clockedOut: { type: String },
  breakTime: { type: String, default: '0 Hr' },
  breakType: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  totalWorkHours: { type: String, required: true },
  rateType: { type: String, enum: ['Flat Rate', 'Hourly Rate', 'Weekend Rate', 'Public Holiday Rate'], required: true },
  hourlyRate: { type: Number, required: true },
  penaltyAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Rejected', 'Pending', 'Approved'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
