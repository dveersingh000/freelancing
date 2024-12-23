const express = require('express');
const Employer = require('../models/Employer');
const router = express.Router();

// Get Employer by ID
router.get('/:employerId', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.status(200).json({ employer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new Employer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, website, address, logo } = req.body;
    const employer = new Employer({ name, email, phone, company, website, address, logo });
    await employer.save();
    res.status(201).json({ employer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
