const express = require('express');
const router = express.Router();
const MedicationApplicationController = require('../controllers/medicationApplicationController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de aplicaciones de medicamentos
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationApplicationController.getApplicationsByPatientId);
router.get('/patient/:patientId/summary', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationApplicationController.getApplicationSummaryByPatient);
router.get('/area/:area', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationApplicationController.getApplicationsByArea);
router.post('/', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationApplicationController.createMedicationApplication);
router.put('/:id', authorizeRole(['admin', 'medico', 'enfermeria']), MedicationApplicationController.updateMedicationApplication);
router.delete('/:id', authorizeRole(['admin']), MedicationApplicationController.deleteMedicationApplication);

module.exports = router;

