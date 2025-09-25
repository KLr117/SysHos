const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

// Rutas de autenticación
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, AuthController.getProfile);
router.post('/logout', authenticateToken, AuthController.logout);

module.exports = router;

