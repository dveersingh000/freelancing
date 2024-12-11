const express = require('express');
const { checkAvailability, getShiftDetails } = require('../controllers/shiftController');

const router = express.Router();

router.get('/availability', checkAvailability);
router.get('/details', getShiftDetails);

module.exports = router;
