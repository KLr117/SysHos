const { promisePool } = require('../config/database');

// Controlador de gestión de signos vitales
class VitalSignsController {
  // Obtener signos vitales por ID de paciente
  static async getVitalSignsByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [vitalSigns] = await promisePool.execute(
        `SELECT vs.*, u.name as recorded_by_name, p.first_name, p.last_name 
         FROM vital_signs vs 
         JOIN users u ON vs.recorded_by = u.id 
         JOIN patients p ON vs.patient_id = p.id 
         WHERE vs.patient_id = ? 
         ORDER BY vs.recorded_at DESC`,
        [patientId]
      );

      res.json({
        vitalSigns,
        total: vitalSigns.length
      });

    } catch (error) {
      console.error('Error al obtener signos vitales:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los signos vitales'
      });
    }
  }

  // Crear nuevo registro de signos vitales
  static async createVitalSigns(req, res) {
    try {
      const { 
        patient_id,
        recorded_by,
        recorded_at,
        blood_pressure_systolic,
        blood_pressure_diastolic,
        heart_rate,
        respiratory_rate,
        temperature,
        oxygen_saturation,
        oxygen_flow,
        pain_level,
        consciousness_level,
        notes
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !recorded_by || !recorded_at) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, usuario y fecha son requeridos'
        });
      }

      // Crear registro de signos vitales
      const [result] = await promisePool.execute(
        `INSERT INTO vital_signs (patient_id, recorded_by, recorded_at, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, respiratory_rate, temperature, oxygen_saturation, oxygen_flow, pain_level, consciousness_level, notes, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patient_id, recorded_by, recorded_at, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, respiratory_rate, temperature, oxygen_saturation, oxygen_flow, pain_level, consciousness_level, notes]
      );

      res.status(201).json({
        message: 'Signos vitales registrados exitosamente',
        vitalSigns: {
          id: result.insertId,
          patient_id,
          recorded_by,
          recorded_at,
          blood_pressure_systolic,
          blood_pressure_diastolic,
          heart_rate,
          respiratory_rate,
          temperature,
          oxygen_saturation,
          oxygen_flow,
          pain_level,
          consciousness_level,
          notes
        }
      });

    } catch (error) {
      console.error('Error al crear signos vitales:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el registro de signos vitales'
      });
    }
  }

  // Actualizar signos vitales
  static async updateVitalSigns(req, res) {
    try {
      const { id } = req.params;
      const { 
        recorded_at,
        blood_pressure_systolic,
        blood_pressure_diastolic,
        heart_rate,
        respiratory_rate,
        temperature,
        oxygen_saturation,
        oxygen_flow,
        pain_level,
        consciousness_level,
        notes
      } = req.body;

      // Verificar si el registro existe
      const [existingRecord] = await promisePool.execute(
        'SELECT id FROM vital_signs WHERE id = ?',
        [id]
      );

      if (existingRecord.length === 0) {
        return res.status(404).json({
          error: 'Registro no encontrado',
          message: 'El registro de signos vitales no existe'
        });
      }

      // Actualizar registro
      await promisePool.execute(
        `UPDATE vital_signs SET recorded_at = ?, blood_pressure_systolic = ?, blood_pressure_diastolic = ?, heart_rate = ?, respiratory_rate = ?, temperature = ?, oxygen_saturation = ?, oxygen_flow = ?, pain_level = ?, consciousness_level = ?, notes = ?, updated_at = NOW() 
         WHERE id = ?`,
        [recorded_at, blood_pressure_systolic, blood_pressure_diastolic, heart_rate, respiratory_rate, temperature, oxygen_saturation, oxygen_flow, pain_level, consciousness_level, notes, id]
      );

      res.json({
        message: 'Signos vitales actualizados exitosamente',
        vitalSigns: {
          id: parseInt(id),
          recorded_at,
          blood_pressure_systolic,
          blood_pressure_diastolic,
          heart_rate,
          respiratory_rate,
          temperature,
          oxygen_saturation,
          oxygen_flow,
          pain_level,
          consciousness_level,
          notes
        }
      });

    } catch (error) {
      console.error('Error al actualizar signos vitales:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el registro de signos vitales'
      });
    }
  }

  // Eliminar signos vitales
  static async deleteVitalSigns(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el registro existe
      const [existingRecord] = await promisePool.execute(
        'SELECT id FROM vital_signs WHERE id = ?',
        [id]
      );

      if (existingRecord.length === 0) {
        return res.status(404).json({
          error: 'Registro no encontrado',
          message: 'El registro de signos vitales no existe'
        });
      }

      // Eliminar registro
      await promisePool.execute(
        'DELETE FROM vital_signs WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Signos vitales eliminados exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar signos vitales:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar el registro de signos vitales'
      });
    }
  }
}

module.exports = VitalSignsController;

