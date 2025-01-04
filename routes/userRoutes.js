const express = require('express');
const { registerUser, generateOTP, resendOTP } = require('../controllers/userController');
const { validateUserRegistration } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/generate-otp', generateOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;











// const express = require("express");
// const router = express.Router();
// const userController = require("../controllers/userController");

// // Routes
// router.post("/register", userController.registerUser);
// router.get("/", userController.getAllUsers);
// router.get("/:email", userController.getUserByEmail);
// router.post("/login", userController.loginUser);
// router.patch("/:id", userController.updateUser);

// module.exports = router;
