const db = require('../config/db');

// Add a Global Recall
exports.addGlobalRecall = async (req, res) => {
  const { device_name, manufacturer_name, recall_reason, recall_date } = req.body;

  if (!device_name || !manufacturer_name || !recall_reason || !recall_date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO global_recalls (device_name, manufacturer_name, recall_reason, recall_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [device_name, manufacturer_name, recall_reason, recall_date]
    );

    res.status(201).json({
      message: 'Global recall added successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding global recall:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Global Recalls
exports.getAllGlobalRecalls = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM global_recalls ORDER BY recall_date DESC'
    );

    res.status(200).json({
      message: 'Global recalls retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching global recalls:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Mark a Recall as Resolved
exports.resolveGlobalRecall = async (req, res) => {
  const { id } = req.params;

  try {
    const recall = await db.query(
      'SELECT * FROM global_recalls WHERE recall_id = $1',
      [id]
    );

    if (recall.rows.length === 0) {
      return res.status(404).json({ message: 'Global recall not found.' });
    }

    if (recall.rows[0].action_taken === 'resolved') {
      return res.status(400).json({ message: 'Global recall is already resolved.' });
    }

    await db.query(
      'UPDATE global_recalls SET action_taken = $1 WHERE recall_id = $2',
      ['resolved', id]
    );

    res.status(200).json({ message: 'Global recall marked as resolved.' });
  } catch (error) {
    console.error('Error resolving global recall:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
