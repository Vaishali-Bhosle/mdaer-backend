// const express = require('express');
// const router = express.Router();
// const institutionController = require('../controllers/institutionController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');

// router.post('/create', authMiddleware, roleMiddleware(['institution_admin']), institutionController.createInstitution);
// router.get('/', authMiddleware, institutionController.getInstitutions);
// router.get('/:id',authMiddleware,institutionController.getInstitutionById)
// module.exports = router;


const express = require('express');
const { 
  createInstitution, 
  getAllInstitutions, 
  deleteInstitution, 
  getInstitutionById 
} = require('../controllers/institutionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware  = require('../middleware/roleMiddleware');
const router = express.Router();

// POST: Create Institution (Only institution_admin can create)
router.post('/create', authMiddleware, roleMiddleware(['institution_admin']), createInstitution);

// GET: Get all institutions (Accessible to institution_admin)
router.get('/', authMiddleware, roleMiddleware(['institution_admin']), getAllInstitutions);

// GET: Get institution by ID (Accessible to institution_admin)
router.get('/:id', authMiddleware, roleMiddleware(['institution_admin']), getInstitutionById);

// DELETE: Delete an institution (Only institution_admin can delete)
router.delete('/:id', authMiddleware, roleMiddleware(['institution_admin']), deleteInstitution);

module.exports = router;
