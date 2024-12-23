// controllers/notificationController.js
const Notification = require('../models/Notification');

// Fetch all notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const { user_id } = req.query;
    const notifications = await Notification.find({ userId: user_id }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notification_id } = req.body;
    const notification = await Notification.findByIdAndUpdate(notification_id, { isRead: true }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notification = new Notification({ userId, message, type });
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
