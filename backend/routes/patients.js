const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de pacientes
router.get('/', authorizeRole(['admin', 'medico', 'enfermeria']), PatientController.getAllPatients);
router.get('/:id', authorizeRole(['admin', 'medico', 'enfermeria']), PatientController.getPatientById);
router.post('/', authorizeRole(['admin', 'medico', 'enfermeria']), PatientController.createPatient);
router.put('/:id', authorizeRole(['admin', 'medico']), PatientController.updatePatient);
router.delete('/:id', authorizeRole(['admin']), PatientController.deletePatient);

module.exports = router;

