const express = require('express');
const router = express.Router();
const ExpensesController = require('../controllers/expensesController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de gestión de gastos generales
router.get('/patient/:patientId', authorizeRole(['admin', 'medico', 'enfermeria']), ExpensesController.getExpensesByPatientId);
router.get('/patient/:patientId/summary', authorizeRole(['admin', 'medico', 'enfermeria']), ExpensesController.getExpenseSummaryByPatient);
router.post('/', authorizeRole(['admin', 'medico', 'enfermeria']), ExpensesController.createExpense);
router.put('/:id', authorizeRole(['admin', 'medico']), ExpensesController.updateExpense);
router.put('/:id/verify', authorizeRole(['admin']), ExpensesController.verifyExpense);
router.delete('/:id', authorizeRole(['admin']), ExpensesController.deleteExpense);

module.exports = router;

