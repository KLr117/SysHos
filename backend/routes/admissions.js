const express = require('express');
const router = express.Router();
const AdmissionController = require('../controllers/admissionController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de ingresos de pacientes
router.get('/', authorizeRole(['admin', 'medico']), AdmissionController.getAllAdmissions);
router.get('/:id', authorizeRole(['admin', 'medico', 'enfermeria']), AdmissionController.getAdmissionById);
router.get('/medical-record/:medicalRecordId', authorizeRole(['admin', 'medico', 'enfermeria']), AdmissionController.getAdmissionByMedicalRecord);
router.post('/', authorizeRole(['admin', 'medico']), AdmissionController.createAdmission);
router.put('/:id', authorizeRole(['admin', 'medico']), AdmissionController.updateAdmission);

module.exports = router;

