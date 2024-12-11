const express = require('express');
const router = express.Router();
const recallController = require('../controllers/recallController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/add', authMiddleware, roleMiddleware(['department_admin']), recallController.addGlobalRecall);
router.get('/', authMiddleware, recallController.getAllGlobalRecalls);
router.put('/resolve/:id', authMiddleware, roleMiddleware(['department_admin']), recallController.resolveGlobalRecall);

module.exports = router;
