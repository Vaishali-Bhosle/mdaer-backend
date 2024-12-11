const db = require('../config/db');

// Create a New Department
exports.createDepartment = async (req, res) => {
  const { department_name, institution_id, admin_1, admin_2 } = req.body;

  if (!department_name || !institution_id || !admin_1 || !admin_2) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO departments (department_name, institution_id, admin_1, admin_2) VALUES ($1, $2, $3, $4) RETURNING *',
      [department_name, institution_id, admin_1, admin_2]
    );

    res.status(201).json({
      message: 'Department created successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch Departments by Institution ID
exports.getDepartmentsByInstitution = async (req, res) => {
  const { institution_id } = req.query;

  if (!institution_id) {
    return res.status(400).json({ message: 'Institution ID is required.' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM departments WHERE institution_id = $1',
      [institution_id]
    );

    res.status(200).json({
      message: 'Departments retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Assign Admins to a Department
exports.assignAdmins = async (req, res) => {
  const { department_id, admin_1, admin_2 } = req.body;

  if (!department_id || !admin_1 || !admin_2) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const result = await db.query(
      'UPDATE departments SET admin_1 = $1, admin_2 = $2 WHERE department_id = $3 RETURNING *',
      [admin_1, admin_2, department_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    res.status(200).json({
      message: 'Admins assigned successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error assigning admins:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
