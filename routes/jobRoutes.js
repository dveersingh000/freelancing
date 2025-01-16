const express = require('express');
const { createJob, getJobs, getJobById, updateJob, getFilters, getDashboardMetrics, viewJob, modifyJob, duplicateJob, deactivateJob, cancelJob, getJobsByDate, applyForJob, getUserJobs} = require('../controllers/jobController');
const authMiddleware  = require('../middlewares/auth');

const router = express.Router();

router.post('/', createJob);
router.get('/', authMiddleware, getJobs);
router.get('/date',authMiddleware, getJobsByDate);
router.get('/metrics', getDashboardMetrics);
router.get('/:id',authMiddleware, getJobById);
router.put('/:id', updateJob);
router.get('/filter', getFilters);
router.get('/:jobId/view', viewJob);
router.put('/:jobId/modify', modifyJob);
router.post('/:jobId/duplicate', duplicateJob);
router.put('/:jobId/deactivate', deactivateJob);
router.delete('/:jobId', cancelJob);
router.post('/apply',authMiddleware, applyForJob);
router.get('/user-jobs',authMiddleware, getUserJobs);

module.exports = router;
