const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: false },
  company: { type: String, required: false },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' }],
  applicants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  location: { type: String, required: false },
  locationCoordinates: { // Structured geolocation data
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
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
},{ timestamps: true });
jobSchema.index({ status: 1 });
jobSchema.index({ location: 1 });

module.exports = mongoose.model('Job', jobSchema);
