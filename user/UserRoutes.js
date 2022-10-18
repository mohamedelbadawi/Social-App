const router = require('express').Router();
const authMiddleware = require('../Auth/AuthMiddleware');
const UserController = require('./UserController');
router.get('/me', authMiddleware.ensureToken, authMiddleware.verifyToken, UserController.me);
module.exports = router;