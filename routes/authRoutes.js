const express = require("express");
const {
    generateOtp,
    verifyOtp,
    registerUser,
    resendOtp,
    // login
} = require("../controllers/authController");

const router = express.Router();

router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerUser);
router.post("/resend-otp", resendOtp);
// router.post("/login", login);

module.exports = router;
