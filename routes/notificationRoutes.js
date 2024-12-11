const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markNotificationAsRead,
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// GET: Fetch all notifications for the authenticated user
router.get('/', authMiddleware, getNotifications);

// PUT: Mark a notification as read for the authenticated user
router.put('/mark-read/:id', authMiddleware, markNotificationAsRead);

module.exports = router;
