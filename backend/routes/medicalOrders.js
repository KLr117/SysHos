const express = require('express');
const router = express.Router();
const MedicalOrderController = require('../controllers/medicalOrderController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de órdenes médicas
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), MedicalOrderController.getOrdersByPatientId);
router.post('/', authorizeRole(['admin', 'medico']), MedicalOrderController.createMedicalOrder);
router.put('/item/:itemId/status', authorizeRole(['admin', 'medico', 'enfermeria']), MedicalOrderController.updateOrderItemStatus);
router.delete('/:id', authorizeRole(['admin']), MedicalOrderController.deleteMedicalOrder);

module.exports = router;

