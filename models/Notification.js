const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Notification title
    message: { type: String, required: true }, // Detailed message
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
    isRead: { type: Boolean, default: false }, // Read status
    createdAt: { type: Date, default: Date.now }, // Timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
