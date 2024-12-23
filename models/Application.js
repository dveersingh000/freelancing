const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    applicantName: {
      type: String,
      required: true,
    },
    applicantEmail: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'accepted', 'rejected', 'no-show'],
      default: 'new',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
