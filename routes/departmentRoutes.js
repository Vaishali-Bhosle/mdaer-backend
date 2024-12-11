const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/create', authMiddleware, roleMiddleware(['institution_admin']), departmentController.createDepartment);
router.get('/:id', authMiddleware, departmentController.getDepartmentsByInstitution);
router.put('/assign-admins', authMiddleware, roleMiddleware(['institution_admin']), departmentController.assignAdmins);

module.exports = router;
