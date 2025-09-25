const express = require('express');
const router = express.Router();
const MedicalRecordController = require('../controllers/medicalRecordController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de expedientes médicos
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), MedicalRecordController.getMedicalRecordByPatientId);
router.post('/', authorizeRole(['admin', 'medico']), MedicalRecordController.createMedicalRecord);
router.put('/:id', authorizeRole(['admin', 'medico']), MedicalRecordController.updateMedicalRecord);
router.delete('/:id', authorizeRole(['admin']), MedicalRecordController.deleteMedicalRecord);

module.exports = router;

