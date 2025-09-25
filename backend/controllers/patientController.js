const { promisePool } = require('../config/database');

// Controlador de gestión de pacientes
class PatientController {
  // Obtener todos los pacientes
  static async getAllPatients(req, res) {
    try {
      const [patients] = await promisePool.execute(
        'SELECT id, first_name, last_name, email, phone, birth_date, gender, address, created_at FROM patients ORDER BY created_at DESC'
      );

      res.json({
        patients,
        total: patients.length
      });

    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los pacientes'
      });
    }
  }

  // Obtener paciente por ID
  static async getPatientById(req, res) {
    try {
      const { id } = req.params;

      const [patients] = await promisePool.execute(
        'SELECT id, first_name, last_name, email, phone, birth_date, gender, address, created_at FROM patients WHERE id = ?',
        [id]
      );

      if (patients.length === 0) {
        return res.status(404).json({
          error: 'Paciente no encontrado',
          message: 'El paciente no existe'
        });
      }

      res.json({
        patient: patients[0]
      });

    } catch (error) {
      console.error('Error al obtener paciente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el paciente'
      });
    }
  }

  // Crear nuevo paciente
  static async createPatient(req, res) {
    try {
      const { 
        first_name, 
        last_name, 
        email, 
        phone, 
        birth_date, 
        gender, 
        address,
        emergency_contact,
        medical_history 
      } = req.body;

      // Validaciones básicas
      if (!first_name || !last_name || !email) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Nombre, apellido y email son requeridos'
        });
      }

      // Verificar si el paciente ya existe
      const [existingPatient] = await promisePool.execute(
        'SELECT id FROM patients WHERE email = ?',
        [email]
      );

      if (existingPatient.length > 0) {
        return res.status(409).json({
          error: 'Paciente existente',
          message: 'Ya existe un paciente con este email'
        });
      }

      // Crear paciente
      const [result] = await promisePool.execute(
        'INSERT INTO patients (first_name, last_name, email, phone, birth_date, gender, address, emergency_contact, medical_history, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [first_name, last_name, email, phone, birth_date, gender, address, emergency_contact, medical_history]
      );

      res.status(201).json({
        message: 'Paciente creado exitosamente',
        patient: {
          id: result.insertId,
          first_name,
          last_name,
          email,
          phone,
          birth_date,
          gender,
          address,
          emergency_contact,
          medical_history
        }
      });

    } catch (error) {
      console.error('Error al crear paciente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el paciente'
      });
    }
  }

  // Actualizar paciente
  static async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const { 
        first_name, 
        last_name, 
        email, 
        phone, 
        birth_date, 
        gender, 
        address,
        emergency_contact,
        medical_history 
      } = req.body;

      // Verificar si el paciente existe
      const [existingPatient] = await promisePool.execute(
        'SELECT id FROM patients WHERE id = ?',
        [id]
      );

      if (existingPatient.length === 0) {
        return res.status(404).json({
          error: 'Paciente no encontrado',
          message: 'El paciente no existe'
        });
      }

      // Actualizar paciente
      await promisePool.execute(
        'UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, birth_date = ?, gender = ?, address = ?, emergency_contact = ?, medical_history = ?, updated_at = NOW() WHERE id = ?',
        [first_name, last_name, email, phone, birth_date, gender, address, emergency_contact, medical_history, id]
      );

      res.json({
        message: 'Paciente actualizado exitosamente',
        patient: {
          id: parseInt(id),
          first_name,
          last_name,
          email,
          phone,
          birth_date,
          gender,
          address,
          emergency_contact,
          medical_history
        }
      });

    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el paciente'
      });
    }
  }

  // Eliminar paciente
  static async deletePatient(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el paciente existe
      const [existingPatient] = await promisePool.execute(
        'SELECT id FROM patients WHERE id = ?',
        [id]
      );

      if (existingPatient.length === 0) {
        return res.status(404).json({
          error: 'Paciente no encontrado',
          message: 'El paciente no existe'
        });
      }

      // Eliminar paciente
      await promisePool.execute(
        'DELETE FROM patients WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Paciente eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar el paciente'
      });
    }
  }
}

module.exports = PatientController;

