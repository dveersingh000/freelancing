// controllers/employerController.js
const Employer = require('../models/Employer');


exports.getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Employer by ID
exports.getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.status(200).json({ employer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new Employer
exports.createEmployer = async (req, res) => {
  try {
    const { name, email, phone, company, website, address, logo } = req.body;
    const employer = new Employer({ name, email, phone, company, website, address, logo });
    await employer.save();
    res.status(201).json({ employer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
