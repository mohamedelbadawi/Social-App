const router = require('express').Router();
const AuthMiddleware = require('./AuthMiddleware');
const AuthController = require('./AuthController');
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;