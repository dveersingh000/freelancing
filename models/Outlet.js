const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  contact: { type: String },
  operatingHours: { type: String },
  workerFeedback: { type: Number, default: 0 }, 
  activeJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

module.exports = mongoose.model('Outlet', outletSchema);
