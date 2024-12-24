// models/Penalty.js
const mongoose = require('mongoose');

const penaltySchema = new mongoose.Schema({
  user_id: String,
  points: Number,
  reason: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Penalty', penaltySchema);
