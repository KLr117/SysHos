const express = require('express');
const router = express.Router();
const NursingNotesController = require('../controllers/nursingNotesController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de notas de enfermería
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), NursingNotesController.getNursingNotesByPatientId);
router.post('/', authorizeRole(['admin', 'enfermeria']), NursingNotesController.createNursingNote);
router.put('/:id', authorizeRole(['admin', 'enfermeria']), NursingNotesController.updateNursingNote);
router.delete('/:id', authorizeRole(['admin']), NursingNotesController.deleteNursingNote);

module.exports = router;

