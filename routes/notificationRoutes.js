const express = require('express');
const {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
} = require('../controllers/notificationController');
const { authMiddleware } = require('../middlewares/auth'); 

const router = express.Router();

router.get('/', authMiddleware, getNotifications); 
router.patch('/:id/read', authMiddleware, markAsRead); 
router.delete('/:id', authMiddleware, deleteNotification); 
router.post('/', createNotification); 

module.exports = router;
