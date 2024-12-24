// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user_id: String,
  title: String,
  duration: Number,
  salary: Number,
  rate: Number,
  status: String,
  date: Date,
  location: String
});

module.exports = mongoose.model('Job', jobSchema);
