const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['Job', 'Payment', 'Message', 'Alert'], // Types of notifications
      required: true,
    },
    icon: {
      type: String, // URL or character for the notification icon
      required: false,
    },
    title: { type: String, required: true }, 
    message: { type: String, required: false }, 
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
