const { promisePool } = require('../config/database');

// Controlador de gestión de ingresos de pacientes
class AdmissionController {
  // Crear nuevo ingreso de paciente (crea paciente + expediente automáticamente)
  static async createAdmission(req, res) {
    try {
      const {
        // Datos del paciente
        patient_name,
        patient_age,
        patient_sex,
        patient_address,
        patient_phone,
        patient_email,
        
        // Datos del ingreso
        admission_date,
        admission_reason,
        chief_complaint,
        history_present_illness,
        
        // Antecedentes
        medical_history,
        surgical_history,
        allergies,
        medications,
        family_history,
        social_history,
        
        // Antropometría
        weight,
        weight_unit,
        height,
        
        // Signos vitales iniciales
        initial_vital_signs,
        
        // Examen físico
        physical_examination,
        
        // Evaluación clínica
        clinical_impression,
        diagnostic_plan,
        treatment_plan,
        
        // Metadatos
        doctor_id,
        admission_type,
        priority_level
      } = req.body;

      // Validaciones básicas
      if (!patient_name || !admission_date || !doctor_id) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Nombre del paciente, fecha de ingreso y doctor son requeridos'
        });
      }

      // Crear paciente si no existe
      let patientId;
      const [existingPatient] = await promisePool.execute(
        'SELECT id FROM patients WHERE name = ? AND age = ?',
        [patient_name, patient_age]
      );

      if (existingPatient.length > 0) {
        patientId = existingPatient[0].id;
      } else {
        const [patientResult] = await promisePool.execute(
          `INSERT INTO patients (name, age, sex, address, phone, email, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [patient_name, patient_age, patient_sex, patient_address, patient_phone, patient_email]
        );
        patientId = patientResult.insertId;
      }

      // Crear expediente médico automáticamente
      const [medicalRecordResult] = await promisePool.execute(
        `INSERT INTO medical_records (patient_id, doctor_id, admission_date, chief_complaint, 
         history_present_illness, medical_history, surgical_history, allergies, medications, 
         family_history, social_history, weight, weight_unit, height, initial_vital_signs, 
         physical_examination, clinical_impression, diagnostic_plan, treatment_plan, 
         admission_type, priority_level, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          patientId, doctor_id, admission_date, chief_complaint, history_present_illness,
          medical_history, surgical_history, allergies, medications, family_history, social_history,
          weight, weight_unit, height, JSON.stringify(initial_vital_signs),
          JSON.stringify(physical_examination), clinical_impression, diagnostic_plan, treatment_plan,
          admission_type, priority_level, 'active'
        ]
      );

      // Crear registro de ingreso
      const [admissionResult] = await promisePool.execute(
        `INSERT INTO admissions (patient_id, medical_record_id, doctor_id, admission_date, 
         admission_reason, admission_type, priority_level, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [patientId, medicalRecordResult.insertId, doctor_id, admission_date, 
         admission_reason, admission_type, priority_level, 'active']
      );

      res.status(201).json({
        message: 'Ingreso de paciente creado exitosamente',
        admission: {
          id: admissionResult.insertId,
          patient_id: patientId,
          medical_record_id: medicalRecordResult.insertId,
          doctor_id,
          admission_date,
          admission_reason,
          admission_type,
          priority_level,
          status: 'active'
        },
        patient: {
          id: patientId,
          name: patient_name,
          age: patient_age,
          sex: patient_sex
        }
      });

    } catch (error) {
      console.error('Error al crear ingreso:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el ingreso del paciente'
      });
    }
  }

  // Obtener ingreso por ID de expediente
  static async getAdmissionByMedicalRecord(req, res) {
    try {
      const { medicalRecordId } = req.params;

      const [admissions] = await promisePool.execute(
        `SELECT a.*, p.name as patient_name, p.age, p.sex, u.name as doctor_name, 
         mr.chief_complaint, mr.clinical_impression, mr.status as record_status
         FROM admissions a 
         JOIN patients p ON a.patient_id = p.id 
         JOIN users u ON a.doctor_id = u.id 
         JOIN medical_records mr ON a.medical_record_id = mr.id 
         WHERE a.medical_record_id = ?`,
        [medicalRecordId]
      );

      if (admissions.length === 0) {
        return res.status(404).json({
          error: 'Ingreso no encontrado',
          message: 'No se encontró ingreso para este expediente'
        });
      }

      res.json({
        admission: admissions[0]
      });

    } catch (error) {
      console.error('Error al obtener ingreso:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el ingreso'
      });
    }
  }

  // Obtener ingreso por ID
  static async getAdmissionById(req, res) {
    try {
      const { id } = req.params;

      const [admissions] = await promisePool.execute(
        `SELECT a.*, p.name as patient_name, p.age, p.sex, p.address, p.phone, p.email,
         u.name as doctor_name, mr.chief_complaint, mr.history_present_illness,
         mr.medical_history, mr.surgical_history, mr.allergies, mr.medications,
         mr.family_history, mr.social_history, mr.weight, mr.weight_unit, mr.height,
         mr.initial_vital_signs, mr.physical_examination, mr.clinical_impression,
         mr.diagnostic_plan, mr.treatment_plan, mr.status as record_status
         FROM admissions a 
         JOIN patients p ON a.patient_id = p.id 
         JOIN users u ON a.doctor_id = u.id 
         JOIN medical_records mr ON a.medical_record_id = mr.id 
         WHERE a.id = ?`,
        [id]
      );

      if (admissions.length === 0) {
        return res.status(404).json({
          error: 'Ingreso no encontrado',
          message: 'El ingreso no existe'
        });
      }

      res.json({
        admission: admissions[0]
      });

    } catch (error) {
      console.error('Error al obtener ingreso:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el ingreso'
      });
    }
  }

  // Actualizar ingreso
  static async updateAdmission(req, res) {
    try {
      const { id } = req.params;
      const {
        admission_reason,
        admission_type,
        priority_level,
        status
      } = req.body;

      // Verificar si el ingreso existe
      const [existingAdmission] = await promisePool.execute(
        'SELECT id FROM admissions WHERE id = ?',
        [id]
      );

      if (existingAdmission.length === 0) {
        return res.status(404).json({
          error: 'Ingreso no encontrado',
          message: 'El ingreso no existe'
        });
      }

      // Actualizar ingreso
      await promisePool.execute(
        `UPDATE admissions SET admission_reason = ?, admission_type = ?, priority_level = ?, 
         status = ?, updated_at = NOW() WHERE id = ?`,
        [admission_reason, admission_type, priority_level, status, id]
      );

      res.json({
        message: 'Ingreso actualizado exitosamente',
        admission: {
          id: parseInt(id),
          admission_reason,
          admission_type,
          priority_level,
          status
        }
      });

    } catch (error) {
      console.error('Error al actualizar ingreso:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el ingreso'
      });
    }
  }

  // Obtener todos los ingresos
  static async getAllAdmissions(req, res) {
    try {
      const [admissions] = await promisePool.execute(
        `SELECT a.*, p.name as patient_name, p.age, p.sex, u.name as doctor_name,
         mr.chief_complaint, mr.clinical_impression, mr.status as record_status
         FROM admissions a 
         JOIN patients p ON a.patient_id = p.id 
         JOIN users u ON a.doctor_id = u.id 
         JOIN medical_records mr ON a.medical_record_id = mr.id 
         ORDER BY a.admission_date DESC`
      );

      res.json({
        admissions,
        total: admissions.length
      });

    } catch (error) {
      console.error('Error al obtener ingresos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los ingresos'
      });
    }
  }
}

module.exports = AdmissionController;

