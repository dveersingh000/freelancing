const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobName: { type: String, required: false },
  location: { type: String, required: false },
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
  dates: [{ type: Date }],
  requirements: {
    jobScopeDescription: { type: String, required: true },
    jobRequirements: { type: String, required: true },
  },
  popularity: { type: Number, default: 0 },
  image: {
    type: String,
    required: true,
    default: '/static/Job.png', 
  },
  salary: String,
  company: {
    name: { type: String, required: true },
    agreementEndDate: { type: Date },
  },
  shifts: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      duration: { type: Number, required: true },
      breakHours: { type: Number, default: 0 },
      breakType: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
      rateType: { type: String, enum: ['Flat rate', 'Hourly'], required: false },
      payRate: { type: Number, required: false },
      totalWage: { type: Number },
      vacancy: { type: Number, default: 0 },
      standbyVacancy: { type: Number, default: 0 },
    },
  ],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  outlet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' }],
  applicants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      applicationDate: { type: Date, default: Date.now }, // Tracks when the user applied
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Withdrawn'],
        default: 'Pending',
      },
    },
  ],
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
