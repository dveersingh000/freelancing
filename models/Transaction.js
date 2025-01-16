const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Cashout', 'Received'], required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, unique: true, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  details: {
    cashoutFee: { type: Number },
    bankName: { type: String },
    bankAccount: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
