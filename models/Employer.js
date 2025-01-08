const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  company: { type: String, required: true }, 
  website: { type: String }, 
  logo: { type: String }, 
  dateCreated: { type: Date, default: Date.now }, 
  outlets: [String],
});

module.exports = mongoose.model('Employer', employerSchema);
