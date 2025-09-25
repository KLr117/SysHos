const { promisePool } = require('../config/database');

// Controlador de gestión de medicamentos
class MedicationController {
  // Obtener medicamentos por ID de paciente
  static async getMedicationsByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [medications] = await promisePool.execute(
        `SELECT m.*, u.name as doctor_name, p.first_name, p.last_name 
         FROM medications m 
         JOIN users u ON m.doctor_id = u.id 
         JOIN patients p ON m.patient_id = p.id 
         WHERE m.patient_id = ? 
         ORDER BY m.created_at DESC`,
        [patientId]
      );

      res.json({
        medications,
        total: medications.length
      });

    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los medicamentos'
      });
    }
  }

  // Crear nueva medicación
  static async createMedication(req, res) {
    try {
      const { 
        patient_id,
        doctor_id,
        medication_type,
        medication_name,
        dosage,
        frequency,
        start_date,
        end_date,
        instructions,
        is_stat
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !doctor_id || !medication_name || !dosage) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, doctor, nombre del medicamento y dosis son requeridos'
        });
      }

      // Crear medicación
      const [result] = await promisePool.execute(
        `INSERT INTO medications (patient_id, doctor_id, medication_type, medication_name, dosage, frequency, start_date, end_date, instructions, is_stat, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, doctor_id, medication_type, medication_name, dosage, frequency, start_date, end_date, instructions, is_stat || false]
      );

      res.status(201).json({
        message: 'Medicación creada exitosamente',
        medication: {
          id: result.insertId,
          patient_id,
          doctor_id,
          medication_type,
          medication_name,
          dosage,
          frequency,
          start_date,
          end_date,
          instructions,
          is_stat
        }
      });

    } catch (error) {
      console.error('Error al crear medicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear la medicación'
      });
    }
  }

  // Registrar aplicación de medicamento
  static async recordMedicationApplication(req, res) {
    try {
      const { medicationId } = req.params;
      const { 
        applied_by,
        application_time,
        dosage_applied,
        notes,
        vital_signs_before,
        vital_signs_after
      } = req.body;

      // Verificar si la medicación existe
      const [existingMedication] = await promisePool.execute(
        'SELECT id FROM medications WHERE id = ?',
        [medicationId]
      );

      if (existingMedication.length === 0) {
        return res.status(404).json({
          error: 'Medicación no encontrada',
          message: 'La medicación no existe'
        });
      }

      // Registrar aplicación
      const [result] = await promisePool.execute(
        `INSERT INTO medication_applications (medication_id, applied_by, application_time, dosage_applied, notes, vital_signs_before, vital_signs_after, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [medicationId, applied_by, application_time, dosage_applied, notes, vital_signs_before, vital_signs_after]
      );

      res.status(201).json({
        message: 'Aplicación de medicamento registrada exitosamente',
        application: {
          id: result.insertId,
          medication_id: medicationId,
          applied_by,
          application_time,
          dosage_applied,
          notes,
          vital_signs_before,
          vital_signs_after
        }
      });

    } catch (error) {
      console.error('Error al registrar aplicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo registrar la aplicación del medicamento'
      });
    }
  }

  // Obtener aplicaciones de medicamento
  static async getMedicationApplications(req, res) {
    try {
      const { medicationId } = req.params;

      const [applications] = await promisePool.execute(
        `SELECT ma.*, u.name as applied_by_name 
         FROM medication_applications ma 
         JOIN users u ON ma.applied_by = u.id 
         WHERE ma.medication_id = ? 
         ORDER BY ma.application_time DESC`,
        [medicationId]
      );

      res.json({
        applications,
        total: applications.length
      });

    } catch (error) {
      console.error('Error al obtener aplicaciones:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las aplicaciones del medicamento'
      });
    }
  }

  // Actualizar medicación
  static async updateMedication(req, res) {
    try {
      const { id } = req.params;
      const { 
        medication_name,
        dosage,
        frequency,
        end_date,
        instructions
      } = req.body;

      // Verificar si la medicación existe
      const [existingMedication] = await promisePool.execute(
        'SELECT id FROM medications WHERE id = ?',
        [id]
      );

      if (existingMedication.length === 0) {
        return res.status(404).json({
          error: 'Medicación no encontrada',
          message: 'La medicación no existe'
        });
      }

      // Actualizar medicación
      await promisePool.execute(
        `UPDATE medications SET medication_name = ?, dosage = ?, frequency = ?, end_date = ?, instructions = ?, updated_at = NOW() 
         WHERE id = ?`,
        [medication_name, dosage, frequency, end_date, instructions, id]
      );

      res.json({
        message: 'Medicación actualizada exitosamente',
        medication: {
          id: parseInt(id),
          medication_name,
          dosage,
          frequency,
          end_date,
          instructions
        }
      });

    } catch (error) {
      console.error('Error al actualizar medicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar la medicación'
      });
    }
  }

  // Eliminar medicación
  static async deleteMedication(req, res) {
    try {
      const { id } = req.params;

      // Verificar si la medicación existe
      const [existingMedication] = await promisePool.execute(
        'SELECT id FROM medications WHERE id = ?',
        [id]
      );

      if (existingMedication.length === 0) {
        return res.status(404).json({
          error: 'Medicación no encontrada',
          message: 'La medicación no existe'
        });
      }

      // Eliminar aplicaciones primero
      await promisePool.execute(
        'DELETE FROM medication_applications WHERE medication_id = ?',
        [id]
      );

      // Eliminar medicación
      await promisePool.execute(
        'DELETE FROM medications WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Medicación eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar medicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la medicación'
      });
    }
  }
}

module.exports = MedicationController;

