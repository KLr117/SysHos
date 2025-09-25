import api from './api';

class PatientService {
  // Obtener todos los pacientes
  async getAllPatients() {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener pacientes');
    }
  }

  // Obtener paciente por ID
  async getPatientById(id) {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener paciente');
    }
  }

  // Crear nuevo paciente
  async createPatient(patientData) {
    try {
      const response = await api.post('/patients', patientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear paciente');
    }
  }

  // Actualizar paciente
  async updatePatient(id, patientData) {
    try {
      const response = await api.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar paciente');
    }
  }

  // Eliminar paciente
  async deletePatient(id) {
    try {
      const response = await api.delete(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar paciente');
    }
  }

  // Buscar pacientes
  async searchPatients(query) {
    try {
      const response = await api.get(`/patients/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al buscar pacientes');
    }
  }
}

export default new PatientService();

