const Notification = require('../models/Notification');

// Fetch notifications
exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Notification.countDocuments({ user: req.user.id });

    res.status(200).json({ notifications, total, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });

    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read', details: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification', details: error.message });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, user } = req.body;

    const notification = new Notification({ title, message, user });
    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification', details: error.message });
  }
};
