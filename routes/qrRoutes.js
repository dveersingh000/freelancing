const express = require('express');
const { scanQRCode } = require('../controllers/qrController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Route to scan QR Code and clock in/out
router.post('/', authMiddleware, scanQRCode);

module.exports = router;
