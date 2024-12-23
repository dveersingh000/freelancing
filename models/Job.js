const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  location: { type: String, required: true },
  requirements: { type: [String], required: true }, // Array of requirements
  shifts: [
    {
      date: { type: Date, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      isAvailable: { type: Boolean, default: true },
    },
  ],
  type: { type: String, required: true }, // e.g., "contract", "daily-paid"
  category: { type: String, required: true }, // e.g., "cleaning", "administrative"
  date: { type: Date, required: true },
  scope: { type: String }, // Job responsibilities or scope
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Job', jobSchema);
