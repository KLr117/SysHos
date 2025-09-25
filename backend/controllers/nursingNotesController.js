const { promisePool } = require('../config/database');

// Controlador de gestión de notas de enfermería
class NursingNotesController {
  // Obtener notas de enfermería por ID de paciente
  static async getNursingNotesByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [notes] = await promisePool.execute(
        `SELECT nn.*, u.name as nurse_name, p.first_name, p.last_name 
         FROM nursing_notes nn 
         JOIN users u ON nn.nurse_id = u.id 
         JOIN patients p ON nn.patient_id = p.id 
         WHERE nn.patient_id = ? 
         ORDER BY nn.created_at DESC`,
        [patientId]
      );

      res.json({
        notes,
        total: notes.length
      });

    } catch (error) {
      console.error('Error al obtener notas de enfermería:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las notas de enfermería'
      });
    }
  }

  // Crear nueva nota de enfermería
  static async createNursingNote(req, res) {
    try {
      const { 
        patient_id,
        nurse_id,
        note_date,
        note_type,
        content,
        observations,
        interventions,
        patient_response,
        follow_up_required
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !nurse_id || !note_date || !content) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, enfermera, fecha y contenido son requeridos'
        });
      }

      // Crear nota de enfermería
      const [result] = await promisePool.execute(
        `INSERT INTO nursing_notes (patient_id, nurse_id, note_date, note_type, content, observations, interventions, patient_response, follow_up_required, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, nurse_id, note_date, note_type, content, observations, interventions, patient_response, follow_up_required || false]
      );

      res.status(201).json({
        message: 'Nota de enfermería creada exitosamente',
        note: {
          id: result.insertId,
          patient_id,
          nurse_id,
          note_date,
          note_type,
          content,
          observations,
          interventions,
          patient_response,
          follow_up_required
        }
      });

    } catch (error) {
      console.error('Error al crear nota de enfermería:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear la nota de enfermería'
      });
    }
  }

  // Actualizar nota de enfermería
  static async updateNursingNote(req, res) {
    try {
      const { id } = req.params;
      const { 
        note_date,
        note_type,
        content,
        observations,
        interventions,
        patient_response,
        follow_up_required
      } = req.body;

      // Verificar si la nota existe
      const [existingNote] = await promisePool.execute(
        'SELECT id FROM nursing_notes WHERE id = ?',
        [id]
      );

      if (existingNote.length === 0) {
        return res.status(404).json({
          error: 'Nota no encontrada',
          message: 'La nota de enfermería no existe'
        });
      }

      // Actualizar nota
      await promisePool.execute(
        `UPDATE nursing_notes SET note_date = ?, note_type = ?, content = ?, observations = ?, interventions = ?, patient_response = ?, follow_up_required = ?, updated_at = NOW() 
         WHERE id = ?`,
        [note_date, note_type, content, observations, interventions, patient_response, follow_up_required, id]
      );

      res.json({
        message: 'Nota de enfermería actualizada exitosamente',
        note: {
          id: parseInt(id),
          note_date,
          note_type,
          content,
          observations,
          interventions,
          patient_response,
          follow_up_required
        }
      });

    } catch (error) {
      console.error('Error al actualizar nota de enfermería:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar la nota de enfermería'
      });
    }
  }

  // Eliminar nota de enfermería
  static async deleteNursingNote(req, res) {
    try {
      const { id } = req.params;

      // Verificar si la nota existe
      const [existingNote] = await promisePool.execute(
        'SELECT id FROM nursing_notes WHERE id = ?',
        [id]
      );

      if (existingNote.length === 0) {
        return res.status(404).json({
          error: 'Nota no encontrada',
          message: 'La nota de enfermería no existe'
        });
      }

      // Eliminar nota
      await promisePool.execute(
        'DELETE FROM nursing_notes WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Nota de enfermería eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar nota de enfermería:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la nota de enfermería'
      });
    }
  }
}

module.exports = NursingNotesController;

