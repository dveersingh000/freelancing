const express = require("express");
const {
    generateOtp,
    verifyOtp,
    registerUser,
    resendOtp,
} = require("../controllers/authController");

const router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerUser);
router.post("/resend-otp", resendOtp);

module.exports = router;
