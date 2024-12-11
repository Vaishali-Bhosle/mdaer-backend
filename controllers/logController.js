const db = require('../config/db');

// Fetch All Audit Logs
exports.getAllLogs = async (req, res) => {
  const { role, user_id } = req.user;

  try {
    if (role === 'institution_admin') {
      // Institution admins can view all logs
      const result = await db.query('SELECT * FROM audit_logs ORDER BY timestamp DESC');
      return res.status(200).json({
        message: 'Audit logs retrieved successfully.',
        data: result.rows,
      });
    } else if (role === 'department_admin') {
      // Department admins can view logs for their department
      const departmentIdResult = await db.query(
        'SELECT department_id FROM users WHERE user_id = $1',
        [user_id]
      );
      const department_id = departmentIdResult.rows[0]?.department_id;

      if (!department_id) {
        return res.status(404).json({ message: 'Department not found for the user.' });
      }

      const result = await db.query(
        `SELECT al.* FROM audit_logs al
         JOIN users u ON al.user_id = u.user_id
         WHERE u.department_id = $1
         ORDER BY al.timestamp DESC`,
        [department_id]
      );

      return res.status(200).json({
        message: 'Department audit logs retrieved successfully.',
        data: result.rows,
      });
    } else {
      // Other roles are not authorized
      return res.status(403).json({ message: 'Unauthorized to access audit logs.' });
    }
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Create a New Audit Log
exports.createLog = async (user_id, action, ip_address) => {
  try {
    await db.query(
      'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
      [user_id, action, ip_address]
    );
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
};
