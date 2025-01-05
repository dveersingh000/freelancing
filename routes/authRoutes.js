const express = require('express');
const { generateOtp, registerUser, resendOtp } = require('../controllers/authController');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/generate-otp', generateOtp);
router.post('/register', registerUser);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

module.exports = router;
