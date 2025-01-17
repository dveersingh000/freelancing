const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: false },
    type: {
      type: String,
      enum: ['Job', 'Payment', 'Message', 'Alert'],
      required: true,
    },
    icon: {
      type: String,
      default: '/static/notificationIcon.png',
    },
    title: { type: String, required: true }, 
    message: { type: String, required: false }, 
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
