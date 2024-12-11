const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/register', rateLimiter, userController.registerUser);
router.post('/login', rateLimiter, userController.loginUser);
router.get('/me', authMiddleware, userController.getUserProfile);

module.exports = router;
