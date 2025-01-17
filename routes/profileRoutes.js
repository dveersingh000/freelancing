const express = require("express");
const { completeProfile, getProfile, updateProfile, getProfileStats } = require("../controllers/profileController");
const {authMiddleware} = require("../middlewares/auth");

const router = express.Router();

router.post("/complete-profile", authMiddleware, completeProfile);
router.get("/", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.get("/stats", authMiddleware, getProfileStats);

module.exports = router;
