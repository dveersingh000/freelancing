const express = require('express');
const { getRegisteredUsers, getJobPostingStats } = require('../controllers/adminController.js');
const router = express.Router();

router.get('/users/registered', getRegisteredUsers);
router.get('/jobs/posted-stats', getJobPostingStats);

// More admin routes as needed

module.exports = router;
