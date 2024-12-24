const express = require('express');
const { getEwalletBalance, cashoutEwalletBalance } = require('../controllers/ewalletController');
const router = express.Router();

router.get('/balance', getEwalletBalance);
router.post('/cashout', cashoutEwalletBalance);

module.exports = router;
