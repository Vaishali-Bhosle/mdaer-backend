const db = require('../config/db');

// Fetch All Notifications for a User
exports.getNotifications = async (req, res) => {
  const { user_id } = req.user;

  try {
    const result = await db.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );

    res.status(200).json({
      message: 'Notifications retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Mark a Notification as Read
exports.markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  try {
    // Verify the notification belongs to the user
    const notification = await db.query(
      'SELECT * FROM notifications WHERE notification_id = $1 AND user_id = $2',
      [id, user_id]
    );

    if (notification.rows.length === 0) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE notification_id = $1',
      [id]
    );

    res.status(200).json({ message: 'Notification marked as read.' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Create a Notification
exports.createNotification = async (user_id, message) => {
  try {
    await db.query(
      'INSERT INTO notifications (user_id, message) VALUES ($1, $2)',
      [user_id, message]
    );
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};
