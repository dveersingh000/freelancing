const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/register", userController.registerUser);
router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);
router.post("/login", userController.loginUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
