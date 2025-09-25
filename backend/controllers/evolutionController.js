const { promisePool } = require('../config/database');

// Controlador de gestión de evoluciones médicas
class EvolutionController {
  // Obtener evoluciones por ID de paciente
  static async getEvolutionsByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [evolutions] = await promisePool.execute(
        `SELECT e.*, u.name as doctor_name, p.first_name, p.last_name 
         FROM evolutions e 
         JOIN users u ON e.doctor_id = u.id 
         JOIN patients p ON e.patient_id = p.id 
         WHERE e.patient_id = ? 
         ORDER BY e.created_at DESC`,
        [patientId]
      );

      res.json({
        evolutions,
        total: evolutions.length
      });

    } catch (error) {
      console.error('Error al obtener evoluciones:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las evoluciones'
      });
    }
  }

  // Crear nueva evolución médica
  static async createEvolution(req, res) {
    try {
      const { 
        patient_id,
        doctor_id,
        evolution_date,
        subjective,
        objective,
        assessment,
        plan,
        notes
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !doctor_id || !evolution_date) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, doctor y fecha son requeridos'
        });
      }

      // Crear evolución
      const [result] = await promisePool.execute(
        `INSERT INTO evolutions (patient_id, doctor_id, evolution_date, subjective, objective, assessment, plan, notes, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, doctor_id, evolution_date, subjective, objective, assessment, plan, notes]
      );

      res.status(201).json({
        message: 'Evolución médica creada exitosamente',
        evolution: {
          id: result.insertId,
          patient_id,
          doctor_id,
          evolution_date,
          subjective,
          objective,
          assessment,
          plan,
          notes
        }
      });

    } catch (error) {
      console.error('Error al crear evolución:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear la evolución médica'
      });
    }
  }

  // Actualizar evolución médica
  static async updateEvolution(req, res) {
    try {
      const { id } = req.params;
      const { 
        evolution_date,
        subjective,
        objective,
        assessment,
        plan,
        notes
      } = req.body;

      // Verificar si la evolución existe
      const [existingEvolution] = await promisePool.execute(
        'SELECT id FROM evolutions WHERE id = ?',
        [id]
      );

      if (existingEvolution.length === 0) {
        return res.status(404).json({
          error: 'Evolución no encontrada',
          message: 'La evolución médica no existe'
        });
      }

      // Actualizar evolución
      await promisePool.execute(
        `UPDATE evolutions SET evolution_date = ?, subjective = ?, objective = ?, assessment = ?, plan = ?, notes = ?, updated_at = NOW() 
         WHERE id = ?`,
        [evolution_date, subjective, objective, assessment, plan, notes, id]
      );

      res.json({
        message: 'Evolución médica actualizada exitosamente',
        evolution: {
          id: parseInt(id),
          evolution_date,
          subjective,
          objective,
          assessment,
          plan,
          notes
        }
      });

    } catch (error) {
      console.error('Error al actualizar evolución:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar la evolución médica'
      });
    }
  }

  // Eliminar evolución médica
  static async deleteEvolution(req, res) {
    try {
      const { id } = req.params;

      // Verificar si la evolución existe
      const [existingEvolution] = await promisePool.execute(
        'SELECT id FROM evolutions WHERE id = ?',
        [id]
      );

      if (existingEvolution.length === 0) {
        return res.status(404).json({
          error: 'Evolución no encontrada',
          message: 'La evolución médica no existe'
        });
      }

      // Eliminar evolución
      await promisePool.execute(
        'DELETE FROM evolutions WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Evolución médica eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar evolución:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la evolución médica'
      });
    }
  }
}

module.exports = EvolutionController;

