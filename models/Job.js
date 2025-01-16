const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: false },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  dates: [{ type: Date }],
  jobDescription: { type: String, required: true },
  jobRequirements: { type: String, required: true },
  jobName: { type: String, required: false },
  company: { type: String, required: false },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' }],
  applicants: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  locationCoordinates: { // Structured geolocation data
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  industry: { type: String, required: false },
  status: { 
    type: String, 
    enum: ['Ongoing', 'Pending', 'Cancelled', 'Completed', 'Deactivated'], 
    default: 'Ongoing' 
  },
  createdAt: { type: Date, default: Date.now },
});
jobSchema.index({ status: 1 });
jobSchema.index({ location: 1 });

module.exports = mongoose.model('Job', jobSchema);
