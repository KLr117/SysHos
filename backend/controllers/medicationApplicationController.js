const { promisePool } = require('../config/database');

// Controlador de gestión de aplicaciones de medicamentos
class MedicationApplicationController {
  // Obtener aplicaciones por ID de paciente
  static async getApplicationsByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [applications] = await promisePool.execute(
        `SELECT ma.*, u.name as applied_by_name, p.first_name, p.last_name, m.medication_name 
         FROM medication_applications ma 
         JOIN users u ON ma.applied_by = u.id 
         JOIN patients p ON ma.patient_id = p.id 
         JOIN medications m ON ma.medication_id = m.id 
         WHERE ma.patient_id = ? 
         ORDER BY ma.application_time DESC`,
        [patientId]
      );

      res.json({
        applications,
        total: applications.length
      });

    } catch (error) {
      console.error('Error al obtener aplicaciones:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las aplicaciones de medicamentos'
      });
    }
  }

  // Crear nueva aplicación de medicamento
  static async createMedicationApplication(req, res) {
    try {
      const { 
        patient_id,
        medication_id,
        applied_by,
        application_time,
        dosage_applied,
        route,
        site,
        notes,
        vital_signs_before,
        vital_signs_after,
        area,
        room
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !medication_id || !applied_by || !application_time) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, medicamento, aplicador y fecha son requeridos'
        });
      }

      // Crear aplicación
      const [result] = await promisePool.execute(
        `INSERT INTO medication_applications (patient_id, medication_id, applied_by, application_time, dosage_applied, route, site, notes, vital_signs_before, vital_signs_after, area, room, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, medication_id, applied_by, application_time, dosage_applied, route, site, notes, vital_signs_before, vital_signs_after, area, room]
      );

      res.status(201).json({
        message: 'Aplicación de medicamento registrada exitosamente',
        application: {
          id: result.insertId,
          patient_id,
          medication_id,
          applied_by,
          application_time,
          dosage_applied,
          route,
          site,
          notes,
          vital_signs_before,
          vital_signs_after,
          area,
          room
        }
      });

    } catch (error) {
      console.error('Error al crear aplicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear la aplicación del medicamento'
      });
    }
  }

  // Obtener aplicaciones por área
  static async getApplicationsByArea(req, res) {
    try {
      const { area } = req.params;

      const [applications] = await promisePool.execute(
        `SELECT ma.*, u.name as applied_by_name, p.first_name, p.last_name, m.medication_name 
         FROM medication_applications ma 
         JOIN users u ON ma.applied_by = u.id 
         JOIN patients p ON ma.patient_id = p.id 
         JOIN medications m ON ma.medication_id = m.id 
         WHERE ma.area = ? 
         ORDER BY ma.application_time DESC`,
        [area]
      );

      res.json({
        applications,
        total: applications.length
      });

    } catch (error) {
      console.error('Error al obtener aplicaciones por área:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las aplicaciones por área'
      });
    }
  }

  // Obtener resumen de aplicaciones por paciente
  static async getApplicationSummaryByPatient(req, res) {
    try {
      const { patientId } = req.params;

      const [summary] = await promisePool.execute(
        `SELECT 
           COUNT(*) as total_applications,
           COUNT(DISTINCT medication_id) as unique_medications,
           COUNT(DISTINCT DATE(application_time)) as days_with_applications,
           SUM(dosage_applied) as total_dosage
         FROM medication_applications 
         WHERE patient_id = ?`,
        [patientId]
      );

      const [byArea] = await promisePool.execute(
        `SELECT area, COUNT(*) as count 
         FROM medication_applications 
         WHERE patient_id = ? 
         GROUP BY area`,
        [patientId]
      );

      res.json({
        summary: summary[0],
        byArea
      });

    } catch (error) {
      console.error('Error al obtener resumen:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el resumen de aplicaciones'
      });
    }
  }

  // Actualizar aplicación
  static async updateMedicationApplication(req, res) {
    try {
      const { id } = req.params;
      const { 
        application_time,
        dosage_applied,
        route,
        site,
        notes,
        vital_signs_before,
        vital_signs_after
      } = req.body;

      // Verificar si la aplicación existe
      const [existingApplication] = await promisePool.execute(
        'SELECT id FROM medication_applications WHERE id = ?',
        [id]
      );

      if (existingApplication.length === 0) {
        return res.status(404).json({
          error: 'Aplicación no encontrada',
          message: 'La aplicación de medicamento no existe'
        });
      }

      // Actualizar aplicación
      await promisePool.execute(
        `UPDATE medication_applications SET application_time = ?, dosage_applied = ?, route = ?, site = ?, notes = ?, vital_signs_before = ?, vital_signs_after = ?, updated_at = NOW() 
         WHERE id = ?`,
        [application_time, dosage_applied, route, site, notes, vital_signs_before, vital_signs_after, id]
      );

      res.json({
        message: 'Aplicación de medicamento actualizada exitosamente',
        application: {
          id: parseInt(id),
          application_time,
          dosage_applied,
          route,
          site,
          notes,
          vital_signs_before,
          vital_signs_after
        }
      });

    } catch (error) {
      console.error('Error al actualizar aplicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar la aplicación del medicamento'
      });
    }
  }

  // Eliminar aplicación
  static async deleteMedicationApplication(req, res) {
    try {
      const { id } = req.params;

      // Verificar si la aplicación existe
      const [existingApplication] = await promisePool.execute(
        'SELECT id FROM medication_applications WHERE id = ?',
        [id]
      );

      if (existingApplication.length === 0) {
        return res.status(404).json({
          error: 'Aplicación no encontrada',
          message: 'La aplicación de medicamento no existe'
        });
      }

      // Eliminar aplicación
      await promisePool.execute(
        'DELETE FROM medication_applications WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Aplicación de medicamento eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar aplicación:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la aplicación del medicamento'
      });
    }
  }
}

module.exports = MedicationApplicationController;

