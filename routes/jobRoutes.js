// routes/jobRoutes.js
const express = require('express');
const {
  getOngoingJobs,
  getCompletedJobs,
  getCancelledJobs,
  getJobDetails,
  cancelJob
} = require('../controllers/jobController');
const router = express.Router();

router.get('/ongoing', getOngoingJobs);
router.get('/completed', getCompletedJobs);
router.get('/cancelled', getCancelledJobs);
router.get('/details', getJobDetails);
router.post('/cancel', cancelJob);

module.exports = router;
