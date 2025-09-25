const { promisePool } = require('../config/database');

// Controlador de gestión de expedientes médicos
class MedicalRecordController {
  // Obtener expediente por ID de paciente
  static async getMedicalRecordByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [records] = await promisePool.execute(
        'SELECT mr.*, p.first_name, p.last_name FROM medical_records mr JOIN patients p ON mr.patient_id = p.id WHERE mr.patient_id = ? ORDER BY mr.created_at DESC',
        [patientId]
      );

      res.json({
        medicalRecords: records,
        total: records.length
      });

    } catch (error) {
      console.error('Error al obtener expediente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el expediente'
      });
    }
  }

  // Crear nuevo expediente médico
  static async createMedicalRecord(req, res) {
    try {
      const { 
        patient_id,
        diagnosis,
        treatment,
        medications,
        notes,
        doctor_id,
        visit_date,
        symptoms,
        vital_signs
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !diagnosis || !doctor_id) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, diagnóstico y doctor son requeridos'
        });
      }

      // Verificar si el paciente existe
      const [existingPatient] = await promisePool.execute(
        'SELECT id FROM patients WHERE id = ?',
        [patient_id]
      );

      if (existingPatient.length === 0) {
        return res.status(404).json({
          error: 'Paciente no encontrado',
          message: 'El paciente no existe'
        });
      }

      // Crear expediente médico
      const [result] = await promisePool.execute(
        'INSERT INTO medical_records (patient_id, diagnosis, treatment, medications, notes, doctor_id, visit_date, symptoms, vital_signs, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [patient_id, diagnosis, treatment, medications, notes, doctor_id, visit_date, symptoms, vital_signs]
      );

      res.status(201).json({
        message: 'Expediente médico creado exitosamente',
        medicalRecord: {
          id: result.insertId,
          patient_id,
          diagnosis,
          treatment,
          medications,
          notes,
          doctor_id,
          visit_date,
          symptoms,
          vital_signs
        }
      });

    } catch (error) {
      console.error('Error al crear expediente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el expediente médico'
      });
    }
  }

  // Actualizar expediente médico
  static async updateMedicalRecord(req, res) {
    try {
      const { id } = req.params;
      const { 
        diagnosis,
        treatment,
        medications,
        notes,
        visit_date,
        symptoms,
        vital_signs
      } = req.body;

      // Verificar si el expediente existe
      const [existingRecord] = await promisePool.execute(
        'SELECT id FROM medical_records WHERE id = ?',
        [id]
      );

      if (existingRecord.length === 0) {
        return res.status(404).json({
          error: 'Expediente no encontrado',
          message: 'El expediente médico no existe'
        });
      }

      // Actualizar expediente
      await promisePool.execute(
        'UPDATE medical_records SET diagnosis = ?, treatment = ?, medications = ?, notes = ?, visit_date = ?, symptoms = ?, vital_signs = ?, updated_at = NOW() WHERE id = ?',
        [diagnosis, treatment, medications, notes, visit_date, symptoms, vital_signs, id]
      );

      res.json({
        message: 'Expediente médico actualizado exitosamente',
        medicalRecord: {
          id: parseInt(id),
          diagnosis,
          treatment,
          medications,
          notes,
          visit_date,
          symptoms,
          vital_signs
        }
      });

    } catch (error) {
      console.error('Error al actualizar expediente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el expediente médico'
      });
    }
  }

  // Eliminar expediente médico
  static async deleteMedicalRecord(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el expediente existe
      const [existingRecord] = await promisePool.execute(
        'SELECT id FROM medical_records WHERE id = ?',
        [id]
      );

      if (existingRecord.length === 0) {
        return res.status(404).json({
          error: 'Expediente no encontrado',
          message: 'El expediente médico no existe'
        });
      }

      // Eliminar expediente
      await promisePool.execute(
        'DELETE FROM medical_records WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Expediente médico eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar expediente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar el expediente médico'
      });
    }
  }
}

module.exports = MedicalRecordController;

