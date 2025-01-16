const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  // worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  worker: {
    name: { type: String, required: true },
    nric: { type: String, required: true },
  },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Cash In', 'Cash Out'], required: true },
  details: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
  balance: { type: Number, required: true },
  method: {
    type: { type: String, enum: ['PayNow', 'Bank Transfer', 'Cash'], required: true },
    description: { type: String },
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
