// const express = require('express');
// const router = express.Router();
// const reportController = require('../controllers/reportController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');

// router.post('/consumer', authMiddleware, reportController.addConsumerReport);
// router.post('/non-consumer', authMiddleware, reportController.addNonConsumerReport);
// router.get('/consumer/:id', authMiddleware, reportController.getConsumerReport);
// router.get('/non-consumer/:id', authMiddleware, reportController.getNonConsumerReport);
// router.get('/all', authMiddleware, roleMiddleware(['institution_admin', 'department_admin']), reportController.getAllReports);

// module.exports = router;


const express = require('express');
const {
  addConsumerReport,
  addNonConsumerReport,
  getConsumerReportById,
  getNonConsumerReportById,
  getAllReports,
} = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// POST: Add a Consumer Report (Accessible to authenticated users with specific roles)
router.post(
  '/consumer',
  authMiddleware,
  roleMiddleware(['healthcare_professional', 'patient_caretaker']),
  addConsumerReport
);

// POST: Add a Non-Consumer Report (Accessible to authenticated users with the 'coordinator' role)
router.post(
  '/non-consumer',
  authMiddleware,
  roleMiddleware(['coordinator']),
  addNonConsumerReport
);

// GET: Get Consumer Report by ID (Accessible to admins and coordinators)
router.get(
  '/consumer/:id',
  authMiddleware,
  roleMiddleware(['department_admin', 'institution_admin', 'coordinator']),
  getConsumerReportById
);

// GET: Get Non-Consumer Report by ID (Accessible to admins and coordinators)
router.get(
  '/non-consumer/:id',
  authMiddleware,
  roleMiddleware(['department_admin', 'institution_admin', 'coordinator']),
  getNonConsumerReportById
);

// GET: Get All Reports (Accessible to admins only)
router.get(
  '/all',
  authMiddleware,
  roleMiddleware(['institution_admin', 'department_admin']),
  getAllReports
);

module.exports = router;
