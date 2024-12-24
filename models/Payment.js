// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  job_id: String,
  user_id: String,
  amount: Number,
  payment_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
