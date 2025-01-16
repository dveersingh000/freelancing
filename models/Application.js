const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: false },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, enum: ['Pending', 'No Show', 'Approved'], default: 'Pending' },
  appliedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
