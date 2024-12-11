const express = require('express');
const { searchJobs, getJobDetails, applyForJob, manageJobs } = require('../controllers/jobController');

const router = express.Router();

router.get('/search', searchJobs);
router.get('/details', getJobDetails);
router.post('/apply', applyForJob);
router.get('/manage', manageJobs);

module.exports = router;
