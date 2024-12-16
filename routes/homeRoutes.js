// routes/homeRoutes.js
const express = require('express');
const { getGreeting, getDates, getJobs, getBottomNavigation } = require('../controllers/homeController');
const router = express.Router();

router.get('/greeting', getGreeting);
router.get('/dates', getDates);
router.get('/jobs', getJobs);
router.get('/navigation', getBottomNavigation);

module.exports = router;