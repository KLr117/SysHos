const { 
  mockUsers, 
  mockPatients, 
  mockMedicalRecords, 
  mockEvolutions, 
  mockMedicalOrders, 
  mockMedications, 
  mockVitalSigns, 
  mockNursingNotes, 
  mockExpenses 
} = require('../data/mockData');

// Middleware para simular datos de la base de datos
const mockDatabase = (req, res, next) => {
  // Agregar datos mock al request para uso en controladores
  req.mockData = {
    users: mockUsers,
    patients: mockPatients,
    medicalRecords: mockMedicalRecords,
    evolutions: mockEvolutions,
    medicalOrders: mockMedicalOrders,
    medications: mockMedications,
    vitalSigns: mockVitalSigns,
    nursingNotes: mockNursingNotes,
    expenses: mockExpenses
  };
  next();
};

module.exports = mockDatabase;
