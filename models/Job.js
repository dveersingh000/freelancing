const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: false },
  company: { type: String, required: false },
  outlet: { type: String, required: false },
  location: { type: String, required: false },
  industry: { type: String, required: false },
  date: { type: Date, required: false },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  jobDescription: { type: String, required: true },
  jobRequirements: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Pending', 'Cancelled', 'Completed', 'Deactivated'] },
});

module.exports = mongoose.model('Job', jobSchema);
