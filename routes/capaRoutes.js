const express = require('express');
const router = express.Router();
const { addCAPAGuideline, getCAPAGuidelinesByReport } = require('../controllers/capaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// POST: Add CAPA Guideline (Accessible to department admins)
router.post(
  '/add',
  authMiddleware,
  roleMiddleware(['department_admin']),
  addCAPAGuideline
);

// GET: Fetch CAPA Guidelines by Report ID (Accessible to authenticated users)
router.get(
  '/report/:report_id',
  authMiddleware,
  getCAPAGuidelinesByReport
);

module.exports = router;
