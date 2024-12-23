// routes/notificationRoutes.js
const express = require('express');
const { getNotifications, markAsRead, createNotification } = require('../controllers/notificationController');

const router = express.Router();

router.get('/', getNotifications);
router.post('/mark-as-read', markAsRead);
router.post('/create', createNotification);

module.exports = router;