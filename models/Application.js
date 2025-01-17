const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: false },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  shift: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['Pending', 'No Show', 'Approved'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
