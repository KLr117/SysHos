const express = require('express');
const router = express.Router();
const VitalSignsController = require('../controllers/vitalSignsController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de signos vitales
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), VitalSignsController.getVitalSignsByPatientId);
router.post('/', authorizeRole(['admin', 'medico', 'enfermeria']), VitalSignsController.createVitalSigns);
router.put('/:id', authorizeRole(['admin', 'medico', 'enfermeria']), VitalSignsController.updateVitalSigns);
router.delete('/:id', authorizeRole(['admin']), VitalSignsController.deleteVitalSigns);

module.exports = router;

