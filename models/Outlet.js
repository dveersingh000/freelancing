const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    activeJobs: { type: Number, default: 0 },
    contact: { type: String, required: true },
    operatingHours: { type: String, required: true },
    workerFeedback: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Outlet', outletSchema);
