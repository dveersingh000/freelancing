const express = require('express');
const {
  getNotifications,
  markAsRead,
  deleteNotification,
  createNotification,
} = require('../controllers/notificationController');
// const { authMiddleware } = require('../middlewares/auth'); 

const router = express.Router();

router.get('/',  getNotifications); 
router.patch('/:id/read',  markAsRead); 
router.delete('/:id',  deleteNotification); 
router.post('/', createNotification); 

module.exports = router;
