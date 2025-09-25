const express = require('express');
const router = express.Router();
const MedicationController = require('../controllers/medicationController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de medicamentos
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationController.getMedicationsByPatientId);
router.post('/', authorizeRole(['admin', 'medico']), MedicationController.createMedication);
router.put('/:id', authorizeRole(['admin', 'medico']), MedicationController.updateMedication);
router.delete('/:id', authorizeRole(['admin']), MedicationController.deleteMedication);

// Rutas de aplicaciones de medicamentos
router.post('/:medicationId/apply', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationController.recordMedicationApplication);
router.get('/:medicationId/applications', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationController.getMedicationApplications);

module.exports = router;

