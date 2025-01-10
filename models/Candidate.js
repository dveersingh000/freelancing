const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    icNumber: { type: String },
    dob: { type: Date, required: true },
    registrationDate: { type: Date, default: Date.now },
    turnUpRate: { type: Number, default: 0 },
    workingHours: { type: Number, default: 0 },
    avgAttendanceRate: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Verified', 'Approved', 'Pending', 'Rejected', 'Incomplete Profile'],
      default: 'Pending',
    },
    eWalletAmount: { type: Number, default: 0 },
    postalCode: { type: String },
    city: { type: String },
    address: { type: String },
    country: { type: String, default: 'Singapore' },
    jobHistory: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        attendanceRate: { type: Number },
        totalJobs: { type: Number },
        workingHours: { type: Number },
        cancellationWithProof: { type: Number },
        neverTurnUp: { type: Number },
        lessThan24hrsCancellation: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', candidateSchema);
