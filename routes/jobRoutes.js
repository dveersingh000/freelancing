const express = require('express');
const { createJob, getJobs, updateJob, getFilters, getDashboardMetrics, viewJob, modifyJob, duplicateJob, deactivateJob, cancelJob} = require('../controllers/jobController');

const router = express.Router();

// Job Routes
router.post('/', createJob);
router.get('/', getJobs);
router.put('/:jobId', updateJob);
router.get('/filter', getFilters);
router.get('/metrics', getDashboardMetrics);
router.get('/view/:jobId', viewJob);
router.put('/modify/:jobId', modifyJob);
router.post('/duplicate', duplicateJob);
router.put('/deactivate/:jobId', deactivateJob);
router.put('/cancel/:jobId', cancelJob);


module.exports = router;
