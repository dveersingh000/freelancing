// routes/employerRoutes.js
const express = require('express');
const { getEmployerById, createEmployer } = require('../controllers/employerController');
const router = express.Router();

// Get Employer by ID
router.get('/:employerId', getEmployerById);

// Create a new Employer
router.post('/', createEmployer);

module.exports = router;
