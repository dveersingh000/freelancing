const express = require('express');
const { 
  checkAvailability, getShiftDetails, applyForShift
} = require('../controllers/shiftController');

const router = express.Router();

router.get('/availability', checkAvailability);
router.get('/details', getShiftDetails);
router.post('/apply', applyForShift);

module.exports = router;