const express = require('express');
const {
  searchJobs,
  getJobDetails,
  applyForJob,
  getEmployerDetails,
  getAvailableShifts,
  getJobRequirements,
  getJobScope,
  getJobTiming,
} = require('../controllers/jobController');

const router = express.Router();

// Define all routes
router.get('/search', searchJobs);
router.get('/details', getJobDetails);
router.post('/apply', applyForJob);
router.get('/employer/details', getEmployerDetails);
router.get('/shifts/available', getAvailableShifts);
router.get('/requirements', getJobRequirements);
router.get('/scope', getJobScope);
router.get('/timing', getJobTiming);

module.exports = router;
