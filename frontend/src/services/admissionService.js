import api from './api';

class AdmissionService {
  // Crear nuevo ingreso de paciente
  async createAdmission(admissionData) {
    try {
      const response = await api.post('/admissions', admissionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear ingreso');
    }
  }

  // Obtener ingreso por ID
  async getAdmissionById(id) {
    try {
      const response = await api.get(`/admissions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener ingreso');
    }
  }

  // Obtener ingreso por expediente médico
  async getAdmissionByMedicalRecord(medicalRecordId) {
    try {
      const response = await api.get(`/admissions/medical-record/${medicalRecordId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener ingreso por expediente');
    }
  }

  // Obtener todos los ingresos
  async getAllAdmissions() {
    try {
      const response = await api.get('/admissions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener ingresos');
    }
  }

  // Actualizar ingreso
  async updateAdmission(id, admissionData) {
    try {
      const response = await api.put(`/admissions/${id}`, admissionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar ingreso');
    }
  }
}

export default new AdmissionService();

