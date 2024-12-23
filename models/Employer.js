const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  company: { type: String, required: true }, // Employer's company name
  website: { type: String }, // Optional website for the employer
  logo: { type: String }, // Optional logo for the employer
  dateCreated: { type: Date, default: Date.now }, // Date when employer account was created
});

module.exports = mongoose.model('Employer', employerSchema);
