const db = require('../config/db');

// Create a New Institution
exports.createInstitution = async (req, res) => {
  const { institution_name, address } = req.body;

  if (!institution_name || !address) {
    return res.status(400).json({ message: 'Institution name and address are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO institutions (institution_name, address) VALUES ($1, $2) RETURNING *',
      [institution_name, address]
    );

    res.status(201).json({
      message: 'Institution created successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating institution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch All Institutions
exports.getAllInstitutions = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM institutions');

    res.status(200).json({
      message: 'Institutions retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch a Single Institution by ID
exports.getInstitutionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM institutions WHERE institution_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Institution not found.' });
    }

    res.status(200).json({
      message: 'Institution retrieved successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching institution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete an Institution by ID
exports.deleteInstitution = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM institutions WHERE institution_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Institution not found.' });
    }

    res.status(200).json({
      message: 'Institution deleted successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error deleting institution:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
