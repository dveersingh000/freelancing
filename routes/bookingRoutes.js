const express = require("express");
const { bookShift } = require("../controllers/BookingController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/book-shift", authMiddleware, bookShift);

module.exports = router;
