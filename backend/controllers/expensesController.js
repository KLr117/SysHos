const { promisePool } = require('../config/database');

// Controlador de gestión de gastos generales
class ExpensesController {
  // Obtener gastos por ID de paciente
  static async getExpensesByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [expenses] = await promisePool.execute(
        `SELECT e.*, u.name as recorded_by_name, p.first_name, p.last_name 
         FROM expenses e 
         JOIN users u ON e.recorded_by = u.id 
         JOIN patients p ON e.patient_id = p.id 
         WHERE e.patient_id = ? 
         ORDER BY e.expense_date DESC`,
        [patientId]
      );

      res.json({
        expenses,
        total: expenses.length
      });

    } catch (error) {
      console.error('Error al obtener gastos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los gastos'
      });
    }
  }

  // Crear nuevo gasto
  static async createExpense(req, res) {
    try {
      const { 
        patient_id,
        recorded_by,
        expense_date,
        category,
        description,
        amount,
        unit,
        quantity,
        total_amount,
        supplier,
        invoice_number,
        notes,
        is_verified
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !recorded_by || !expense_date || !category || !amount) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, usuario, fecha, categoría y monto son requeridos'
        });
      }

      // Crear gasto
      const [result] = await promisePool.execute(
        `INSERT INTO expenses (patient_id, recorded_by, expense_date, category, description, amount, unit, quantity, total_amount, supplier, invoice_number, notes, is_verified, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, recorded_by, expense_date, category, description, amount, unit, quantity, total_amount, supplier, invoice_number, notes, is_verified || false]
      );

      res.status(201).json({
        message: 'Gasto registrado exitosamente',
        expense: {
          id: result.insertId,
          patient_id,
          recorded_by,
          expense_date,
          category,
          description,
          amount,
          unit,
          quantity,
          total_amount,
          supplier,
          invoice_number,
          notes,
          is_verified
        }
      });

    } catch (error) {
      console.error('Error al crear gasto:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el gasto'
      });
    }
  }

  // Obtener resumen de gastos por paciente
  static async getExpenseSummaryByPatient(req, res) {
    try {
      const { patientId } = req.params;

      const [summary] = await promisePool.execute(
        `SELECT 
           COUNT(*) as total_expenses,
           SUM(total_amount) as total_amount,
           AVG(total_amount) as average_amount,
           MIN(expense_date) as first_expense,
           MAX(expense_date) as last_expense
         FROM expenses 
         WHERE patient_id = ?`,
        [patientId]
      );

      const [byCategory] = await promisePool.execute(
        `SELECT category, COUNT(*) as count, SUM(total_amount) as total 
         FROM expenses 
         WHERE patient_id = ? 
         GROUP BY category 
         ORDER BY total DESC`,
        [patientId]
      );

      const [byDate] = await promisePool.execute(
        `SELECT DATE(expense_date) as date, COUNT(*) as count, SUM(total_amount) as total 
         FROM expenses 
         WHERE patient_id = ? 
         GROUP BY DATE(expense_date) 
         ORDER BY date DESC 
         LIMIT 30`,
        [patientId]
      );

      res.json({
        summary: summary[0],
        byCategory,
        byDate
      });

    } catch (error) {
      console.error('Error al obtener resumen de gastos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el resumen de gastos'
      });
    }
  }

  // Verificar gasto
  static async verifyExpense(req, res) {
    try {
      const { id } = req.params;
      const { is_verified, verification_notes } = req.body;

      // Verificar si el gasto existe
      const [existingExpense] = await promisePool.execute(
        'SELECT id FROM expenses WHERE id = ?',
        [id]
      );

      if (existingExpense.length === 0) {
        return res.status(404).json({
          error: 'Gasto no encontrado',
          message: 'El gasto no existe'
        });
      }

      // Actualizar verificación
      await promisePool.execute(
        'UPDATE expenses SET is_verified = ?, verification_notes = ?, verified_at = NOW(), updated_at = NOW() WHERE id = ?',
        [is_verified, verification_notes, id]
      );

      res.json({
        message: 'Gasto verificado exitosamente',
        expense: {
          id: parseInt(id),
          is_verified,
          verification_notes
        }
      });

    } catch (error) {
      console.error('Error al verificar gasto:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo verificar el gasto'
      });
    }
  }

  // Actualizar gasto
  static async updateExpense(req, res) {
    try {
      const { id } = req.params;
      const { 
        expense_date,
        category,
        description,
        amount,
        unit,
        quantity,
        total_amount,
        supplier,
        invoice_number,
        notes
      } = req.body;

      // Verificar si el gasto existe
      const [existingExpense] = await promisePool.execute(
        'SELECT id FROM expenses WHERE id = ?',
        [id]
      );

      if (existingExpense.length === 0) {
        return res.status(404).json({
          error: 'Gasto no encontrado',
          message: 'El gasto no existe'
        });
      }

      // Actualizar gasto
      await promisePool.execute(
        `UPDATE expenses SET expense_date = ?, category = ?, description = ?, amount = ?, unit = ?, quantity = ?, total_amount = ?, supplier = ?, invoice_number = ?, notes = ?, updated_at = NOW() 
         WHERE id = ?`,
        [expense_date, category, description, amount, unit, quantity, total_amount, supplier, invoice_number, notes, id]
      );

      res.json({
        message: 'Gasto actualizado exitosamente',
        expense: {
          id: parseInt(id),
          expense_date,
          category,
          description,
          amount,
          unit,
          quantity,
          total_amount,
          supplier,
          invoice_number,
          notes
        }
      });

    } catch (error) {
      console.error('Error al actualizar gasto:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el gasto'
      });
    }
  }

  // Eliminar gasto
  static async deleteExpense(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el gasto existe
      const [existingExpense] = await promisePool.execute(
        'SELECT id FROM expenses WHERE id = ?',
        [id]
      );

      if (existingExpense.length === 0) {
        return res.status(404).json({
          error: 'Gasto no encontrado',
          message: 'El gasto no existe'
        });
      }

      // Eliminar gasto
      await promisePool.execute(
        'DELETE FROM expenses WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Gasto eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar el gasto'
      });
    }
  }
}

module.exports = ExpensesController;

