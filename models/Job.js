const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: false },
  company: { type: String, required: false },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' }],
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  location: { type: String, required: false },
  industry: { type: String, required: false },
  date: { type: Date, required: false },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  jobDescription: { type: String, required: true },
  jobRequirements: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Pending', 'Cancelled', 'Completed', 'Deactivated'], 
    default: 'Pending' 
  },
});

module.exports = mongoose.model('Job', jobSchema);
