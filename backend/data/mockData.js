// Datos mock para simular la base de datos
const mockUsers = [
  {
    id: 1,
    email: 'admin@hospital.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Dr. Administrador',
    role: 'admin',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    email: 'medico@hospital.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Dr. Juan Pérez',
    role: 'medico',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 3,
    email: 'enfermeria@hospital.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Enfermera María García',
    role: 'enfermeria',
    created_at: '2024-01-01T00:00:00.000Z'
  }
];

const mockPatients = [
  {
    id: 1,
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '+502 1234-5678',
    birth_date: '1985-03-15',
    gender: 'Masculino',
    address: 'Zona 10, Ciudad de Guatemala',
    emergency_contact: 'María Pérez - +502 8765-4321',
    medical_history: 'Sin antecedentes médicos relevantes',
    created_at: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 2,
    first_name: 'María',
    last_name: 'García',
    email: 'maria.garcia@email.com',
    phone: '+502 8765-4321',
    birth_date: '1990-07-22',
    gender: 'Femenino',
    address: 'Zona 15, Ciudad de Guatemala',
    emergency_contact: 'Carlos García - +502 5555-1234',
    medical_history: 'Alergia a la penicilina',
    created_at: '2024-01-14T14:20:00.000Z'
  },
  {
    id: 3,
    first_name: 'Carlos',
    last_name: 'López',
    email: 'carlos.lopez@email.com',
    phone: '+502 5555-1234',
    birth_date: '1978-11-08',
    gender: 'Masculino',
    address: 'Zona 7, Ciudad de Guatemala',
    emergency_contact: 'Ana López - +502 9999-8888',
    medical_history: 'Hipertensión arterial',
    created_at: '2024-01-13T09:15:00.000Z'
  }
];

const mockMedicalRecords = [
  {
    id: 1,
    patient_id: 1,
    diagnosis: 'Resfriado común',
    treatment: 'Reposo y líquidos abundantes',
    medications: 'Paracetamol 500mg cada 8 horas',
    notes: 'Paciente presenta síntomas leves de resfriado',
    doctor_id: 2,
    visit_date: '2024-01-15T10:30:00.000Z',
    symptoms: 'Congestión nasal, dolor de cabeza',
    vital_signs: 'TA: 120/80, FC: 72, T: 37.2°C',
    created_at: '2024-01-15T10:30:00.000Z'
  },
  {
    id: 2,
    patient_id: 2,
    diagnosis: 'Control de alergia',
    treatment: 'Evitar exposición a alérgenos',
    medications: 'Antihistamínico según necesidad',
    notes: 'Paciente con alergia conocida a penicilina',
    doctor_id: 2,
    visit_date: '2024-01-14T14:20:00.000Z',
    symptoms: 'Sin síntomas actuales',
    vital_signs: 'TA: 110/70, FC: 68, T: 36.8°C',
    created_at: '2024-01-14T14:20:00.000Z'
  },
  {
    id: 3,
    patient_id: 3,
    diagnosis: 'Control de hipertensión',
    treatment: 'Continuar con medicación actual',
    medications: 'Losartán 50mg diario',
    notes: 'Paciente con hipertensión controlada',
    doctor_id: 2,
    visit_date: '2024-01-13T09:15:00.000Z',
    symptoms: 'Sin síntomas',
    vital_signs: 'TA: 125/80, FC: 75, T: 36.5°C',
    created_at: '2024-01-13T09:15:00.000Z'
  }
];

const mockEvolutions = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 2,
    evolution_date: '2024-01-15T10:30:00.000Z',
    subjective: 'Paciente refiere mejoría de síntomas',
    objective: 'Estado general estable, sin fiebre',
    assessment: 'Evolución favorable del resfriado',
    plan: 'Continuar con tratamiento actual',
    notes: 'Paciente colaborador, sin complicaciones',
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

const mockMedicalOrders = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 2,
    order_date: '2024-01-15T10:30:00.000Z',
    priority: 'Normal',
    notes: 'Orden de laboratorio y medicamentos',
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

const mockMedications = [
  {
    id: 1,
    patient_id: 1,
    doctor_id: 2,
    medication_type: 'Analgésico',
    medication_name: 'Paracetamol',
    dosage: '500mg',
    frequency: 'Cada 8 horas',
    start_date: '2024-01-15T10:30:00.000Z',
    end_date: '2024-01-18T10:30:00.000Z',
    instructions: 'Tomar con alimentos',
    is_stat: false,
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

const mockVitalSigns = [
  {
    id: 1,
    patient_id: 1,
    recorded_by: 3,
    recorded_at: '2024-01-15T10:30:00.000Z',
    blood_pressure_systolic: 120,
    blood_pressure_diastolic: 80,
    heart_rate: 72,
    respiratory_rate: 18,
    temperature: 37.2,
    oxygen_saturation: 98,
    oxygen_flow: 0,
    pain_level: 3,
    consciousness_level: 'Consciente',
    notes: 'Signos vitales estables',
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

const mockNursingNotes = [
  {
    id: 1,
    patient_id: 1,
    nurse_id: 3,
    note_date: '2024-01-15T10:30:00.000Z',
    note_type: 'Seguimiento',
    content: 'Paciente estable, colaborador con el tratamiento',
    observations: 'Sin cambios significativos',
    interventions: 'Administración de medicamentos según indicación',
    patient_response: 'Buena respuesta al tratamiento',
    follow_up_required: true,
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

const mockExpenses = [
  {
    id: 1,
    patient_id: 1,
    recorded_by: 3,
    expense_date: '2024-01-15T10:30:00.000Z',
    category: 'Laboratorio',
    description: 'Hemograma completo',
    amount: 25.00,
    unit: 'prueba',
    quantity: 1,
    total_amount: 25.00,
    supplier: 'Laboratorio Central',
    invoice_number: 'LAB-001',
    notes: 'Examen de rutina',
    is_verified: true,
    created_at: '2024-01-15T10:30:00.000Z'
  }
];

module.exports = {
  mockUsers,
  mockPatients,
  mockMedicalRecords,
  mockEvolutions,
  mockMedicalOrders,
  mockMedications,
  mockVitalSigns,
  mockNursingNotes,
  mockExpenses
};
