const db = require('../config/db');

// Add CAPA Guidelines
exports.addCAPAGuideline = async (req, res) => {
  const { report_id, admin_id, guideline } = req.body;

  if (!report_id || !admin_id || !guideline) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO capa_guidelines (report_id, admin_id, guideline, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [report_id, admin_id, guideline]
    );

    res.status(201).json({
      message: 'CAPA guideline added successfully.',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding CAPA guideline:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch CAPA Guidelines for a Report
exports.getCAPAGuidelinesByReport = async (req, res) => {
  const { report_id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM capa_guidelines WHERE report_id = $1',
      [report_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No CAPA guidelines found for this report.' });
    }

    res.status(200).json({
      message: 'CAPA guidelines retrieved successfully.',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching CAPA guidelines:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
