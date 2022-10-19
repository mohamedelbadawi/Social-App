const router = require('express').Router();
const authMiddleware = require('../Auth/AuthMiddleware');
const UserController = require('./UserController');
const upload = require('../scripts/upload');
router.get('/me', authMiddleware.ensureToken, authMiddleware.verifyToken, UserController.me);
router.post('/update-profile/:id', upload.single('image'), authMiddleware.ensureToken, authMiddleware.verifyToken, UserController.updateProfile);
router.post('/follow/:id', authMiddleware.ensureToken, authMiddleware.verifyToken, UserController.followUser);
module.exports = router;