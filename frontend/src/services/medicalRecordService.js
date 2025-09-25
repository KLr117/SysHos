import api from './api';

class MedicalRecordService {
  // Obtener expedientes por ID de paciente
  async getMedicalRecordsByPatientId(patientId) {
    try {
      const response = await api.get(`/medical-records/patient/${patientId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener expedientes');
    }
  }

  // Crear nuevo expediente médico
  async createMedicalRecord(recordData) {
    try {
      const response = await api.post('/medical-records', recordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear expediente');
    }
  }

  // Actualizar expediente médico
  async updateMedicalRecord(id, recordData) {
    try {
      const response = await api.put(`/medical-records/${id}`, recordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar expediente');
    }
  }

  // Eliminar expediente médico
  async deleteMedicalRecord(id) {
    try {
      const response = await api.delete(`/medical-records/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar expediente');
    }
  }

  // Obtener expediente por ID
  async getMedicalRecordById(id) {
    try {
      const response = await api.get(`/medical-records/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener expediente');
    }
  }
}

export default new MedicalRecordService();

