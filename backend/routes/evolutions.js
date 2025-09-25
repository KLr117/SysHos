const express = require('express');
const router = express.Router();
const EvolutionController = require('../controllers/evolutionController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de evoluciones médicas
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), EvolutionController.getEvolutionsByPatientId);
router.post('/', authorizeRole(['admin', 'medico']), EvolutionController.createEvolution);
router.put('/:id', authorizeRole(['admin', 'medico']), EvolutionController.updateEvolution);
router.delete('/:id', authorizeRole(['admin']), EvolutionController.deleteEvolution);

module.exports = router;

