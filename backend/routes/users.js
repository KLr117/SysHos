const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de usuarios
router.get('/', authorizeRole(['admin']), UserController.getAllUsers);
router.get('/:id', authorizeRole(['admin', 'medico']), UserController.getUserById);
router.post('/', authorizeRole(['admin']), UserController.createUser);
router.put('/:id', authorizeRole(['admin']), UserController.updateUser);
router.delete('/:id', authorizeRole(['admin']), UserController.deleteUser);

module.exports = router;

