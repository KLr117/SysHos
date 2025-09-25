import { useState } from 'react';

const PatientAdmission = () => {
  const [formData, setFormData] = useState({
    // Datos del paciente
    patient_name: '',
    patient_age: '',
    patient_sex: '',
    patient_address: '',
    patient_phone: '',
    patient_email: '',
    
    // Datos del ingreso
    admission_date: new Date().toISOString().split('T')[0],
    admission_reason: '',
    chief_complaint: '',
    history_present_illness: '',
    
    // Antecedentes
    medical_history: '',
    surgical_history: '',
    allergies: '',
    medications: '',
    family_history: '',
    social_history: '',
    
    // Antropometría
    weight: '',
    weight_unit: 'kg',
    height: '',
    
    // Signos vitales iniciales
    heart_rate: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    respiratory_rate: '',
    temperature: '',
    oxygen_saturation: '',
    
    // Examen físico
    head_examination: '',
    neck_examination: '',
    chest_examination: '',
    pulmonary_examination: '',
    cardiovascular_examination: '',
    gastrointestinal_examination: '',
    genitourinary_examination: '',
    extremities_examination: '',
    neurological_examination: '',
    
    // Evaluación clínica
    clinical_impression: '',
    diagnostic_plan: '',
    treatment_plan: '',
    
    // Metadatos
    admission_type: 'emergency',
    priority_level: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simular envío de datos (por ahora)
      console.log('Datos del ingreso:', formData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Ingreso de paciente registrado exitosamente');
      
      // Resetear formulario
      setFormData({
        patient_name: '',
        patient_age: '',
        patient_sex: '',
        patient_address: '',
        patient_phone: '',
        patient_email: '',
        admission_date: new Date().toISOString().split('T')[0],
        admission_reason: '',
        chief_complaint: '',
        history_present_illness: '',
        medical_history: '',
        surgical_history: '',
        allergies: '',
        medications: '',
        family_history: '',
        social_history: '',
        weight: '',
        weight_unit: 'kg',
        height: '',
        heart_rate: '',
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        respiratory_rate: '',
        temperature: '',
        oxygen_saturation: '',
        head_examination: '',
        neck_examination: '',
        chest_examination: '',
        pulmonary_examination: '',
        cardiovascular_examination: '',
        gastrointestinal_examination: '',
        genitourinary_examination: '',
        extremities_examination: '',
        neurological_examination: '',
        clinical_impression: '',
        diagnostic_plan: '',
        treatment_plan: '',
        admission_type: 'emergency',
        priority_level: 'normal'
      });
      
    } catch (error) {
      setSubmitMessage('Error al registrar el ingreso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ingreso de Paciente</h1>
        <p className="text-hospital-gray">Registro inicial del flujo clínico</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Datos del Paciente */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos del Paciente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edad *
              </label>
              <input
                type="number"
                name="patient_age"
                value={formData.patient_age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexo *
              </label>
              <select
                name="patient_sex"
                value={formData.patient_sex}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                required
              >
                <option value="">Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="patient_address"
                value={formData.patient_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="patient_phone"
                value={formData.patient_phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="patient_email"
                value={formData.patient_email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Motivo de Consulta */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Motivo de Consulta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Ingreso *
              </label>
              <input
                type="date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Ingreso
              </label>
              <select
                name="admission_type"
                value={formData.admission_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              >
                <option value="emergency">Emergencia</option>
                <option value="scheduled">Programado</option>
                <option value="transfer">Traslado</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo de Consulta *
              </label>
              <input
                type="text"
                name="admission_reason"
                value={formData.admission_reason}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: Dolor abdominal, Fiebre, etc."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo de Consulta (HEA) *
              </label>
              <textarea
                name="chief_complaint"
                value={formData.chief_complaint}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Describa el motivo de consulta en palabras del paciente"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Historia de la Enfermedad Actual
              </label>
              <textarea
                name="history_present_illness"
                value={formData.history_present_illness}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Desarrollo cronológico de los síntomas"
              />
            </div>
          </div>
        </div>

        {/* Antecedentes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Antecedentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antecedentes Médicos (M)
              </label>
              <textarea
                name="medical_history"
                value={formData.medical_history}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Enfermedades previas, hospitalizaciones"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antecedentes Quirúrgicos (Q)
              </label>
              <textarea
                name="surgical_history"
                value={formData.surgical_history}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Cirugías previas, fechas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alergias (AL)
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Medicamentos, alimentos, otros"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medicamentos Actuales (Tx)
              </label>
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Medicamentos que toma actualmente"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antecedentes Familiares
              </label>
              <textarea
                name="family_history"
                value={formData.family_history}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Enfermedades familiares relevantes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antecedentes Sociales
              </label>
              <textarea
                name="social_history"
                value={formData.social_history}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ocupación, hábitos, etc."
              />
            </div>
          </div>
        </div>

        {/* Antropometría */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Antropometría</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="70"
                />
                <select
                  name="weight_unit"
                  value={formData.weight_unit}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                >
                  <option value="kg">Kg</option>
                  <option value="lb">Lb</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Talla (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="170"
              />
            </div>
          </div>
        </div>

        {/* Signos Vitales Iniciales */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Signos Vitales Iniciales</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FC (bpm)
              </label>
              <input
                type="number"
                name="heart_rate"
                value={formData.heart_rate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PA Sistólica
              </label>
              <input
                type="number"
                name="blood_pressure_systolic"
                value={formData.blood_pressure_systolic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PA Diastólica
              </label>
              <input
                type="number"
                name="blood_pressure_diastolic"
                value={formData.blood_pressure_diastolic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FR (rpm)
              </label>
              <input
                type="number"
                name="respiratory_rate"
                value={formData.respiratory_rate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="18"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                T°C
              </label>
              <input
                type="number"
                step="0.1"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="37.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SpO2 (%)
              </label>
              <input
                type="number"
                name="oxygen_saturation"
                value={formData.oxygen_saturation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="98"
              />
            </div>
          </div>
        </div>

        {/* Examen Físico */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Examen Físico</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabeza
              </label>
              <textarea
                name="head_examination"
                value={formData.head_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Inspección, palpación"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuello
              </label>
              <textarea
                name="neck_examination"
                value={formData.neck_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Tiroides, ganglios"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tórax
              </label>
              <textarea
                name="chest_examination"
                value={formData.chest_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Inspección, palpación"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pulmonar
              </label>
              <textarea
                name="pulmonary_examination"
                value={formData.pulmonary_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Auscultación, percusión"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardiovascular
              </label>
              <textarea
                name="cardiovascular_examination"
                value={formData.cardiovascular_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Auscultación cardíaca"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gastrointestinal
              </label>
              <textarea
                name="gastrointestinal_examination"
                value={formData.gastrointestinal_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Abdomen, hígado, bazo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genitourinario
              </label>
              <textarea
                name="genitourinary_examination"
                value={formData.genitourinary_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Genitales, riñones"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extremidades
              </label>
              <textarea
                name="extremities_examination"
                value={formData.extremities_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Pulsos, edema, movilidad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Neurológico
              </label>
              <textarea
                name="neurological_examination"
                value={formData.neurological_examination}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Reflejos, fuerza, sensibilidad"
              />
            </div>
          </div>
        </div>

        {/* Evaluación Clínica */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Evaluación Clínica</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impresión Clínica *
              </label>
              <textarea
                name="clinical_impression"
                value={formData.clinical_impression}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Diagnóstico presuntivo o diferencial"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Diagnóstico
              </label>
              <textarea
                name="diagnostic_plan"
                value={formData.diagnostic_plan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Exámenes complementarios, estudios"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan de Tratamiento
              </label>
              <textarea
                name="treatment_plan"
                value={formData.treatment_plan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Medicamentos, procedimientos, seguimiento"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-hospital-blue hover:bg-blue-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Ingreso'}
          </button>
        </div>

        {/* Mensaje de confirmación */}
        {submitMessage && (
          <div className={`mt-4 p-4 rounded-lg ${
            submitMessage.includes('exitosamente') 
              ? 'bg-hospital-green bg-opacity-10 text-hospital-green border border-hospital-green' 
              : 'bg-hospital-red bg-opacity-10 text-hospital-red border border-hospital-red'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientAdmission;

