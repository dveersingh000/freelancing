const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  date: { type: Date, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Shift', shiftSchema);
