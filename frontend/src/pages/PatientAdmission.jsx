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
    antecedentes_m: '',
    antecedentes_q: '',
    antecedentes_al: '',
    antecedentes_tx: '',
    antecedentes_gyo_menarquia: '',
    antecedentes_menopausia: '',
    antecedentes_g: '',
    antecedentes_p: '',
    antecedentes_ab: '',
    antecedentes_cstp: '',
    hv: '',
    hm: '',
    
    // Checkboxes para antecedentes
    antecedentes_m_nr: false,
    antecedentes_q_nr: false,
    antecedentes_al_nr: false,
    antecedentes_tx_nr: false,
    antecedentes_gyo_menarquia_na: false,
    antecedentes_menopausia_na: false,
    antecedentes_g_na: false,
    antecedentes_p_na: false,
    antecedentes_ab_na: false,
    antecedentes_cstp_na: false,
    hv_na: false,
    hm_na: false,
    
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
    new_data: '',
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const fieldName = name.replace('_nr', '').replace('_na', '');
    
    setFormData(prev => ({
      ...prev,
      [name]: checked,
      [fieldName]: checked ? (name.includes('_nr') ? 'N/R' : null) : ''
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
        antecedentes_m: '',
        antecedentes_q: '',
        antecedentes_al: '',
        antecedentes_tx: '',
        antecedentes_gyo_menarquia: '',
        antecedentes_menopausia: '',
        antecedentes_g: '',
        antecedentes_p: '',
        antecedentes_ab: '',
        antecedentes_cstp: '',
        hv: '',
        hm: '',
        antecedentes_m_nr: false,
        antecedentes_q_nr: false,
        antecedentes_al_nr: false,
        antecedentes_tx_nr: false,
        antecedentes_gyo_menarquia_na: false,
        antecedentes_menopausia_na: false,
        antecedentes_g_na: false,
        antecedentes_p_na: false,
        antecedentes_ab_na: false,
        antecedentes_cstp_na: false,
        hv_na: false,
        hm_na: false,
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
        new_data: '',
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
          <div className="space-y-4">
            {/* Nombre - Campo ancho */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Nombre completo"
                required
              />
            </div>
            
            {/* Edad, Sexo, Fecha - En la misma línea */}
            <div className="flex gap-4">
            <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
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
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad *
                </label>
                <input
                  type="number"
                  name="patient_age"
                  value={formData.patient_age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Ej: 45"
                  required
                />
              </div>
              <div className="w-24">
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
                  <option value="">Seleccione sexo</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
            </div>
            
            {/* Dirección - Campo ancho */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="patient_address"
                value={formData.patient_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Dirección completa"
              />
            </div>
          </div>
        </div>

        {/* Motivo de Consulta y HEA */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Motivo de Consulta y HEA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Escriba el motivo de ingreso"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HEA *
              </label>
              <textarea
                name="chief_complaint"
                value={formData.chief_complaint}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Escriba historia de enfermedad actual"
                required
              />
            </div>
          </div>
        </div>

        {/* Antecedentes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Antecedentes</h2>
          <div className="space-y-4">
            {/* M, Q, Al, Tx - Campos con checkbox N/R */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Antecedentes Médicos (M) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    M
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_m_nr"
                      checked={formData.antecedentes_m_nr}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    N/R
                  </label>
                </div>
                <textarea
                  name="antecedentes_m"
                  value={formData.antecedentes_m}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={formData.antecedentes_m_nr}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_m_nr ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Escriba aquí"
                />
              </div>

              {/* Antecedentes Quirúrgicos (Q) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Q
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_q_nr"
                      checked={formData.antecedentes_q_nr}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    N/R
                  </label>
                </div>
                <textarea
                  name="antecedentes_q"
                  value={formData.antecedentes_q}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={formData.antecedentes_q_nr}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_q_nr ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Escriba aquí"
                />
              </div>

              {/* Alergias (AL) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Al
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_al_nr"
                      checked={formData.antecedentes_al_nr}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    N/R
                  </label>
                </div>
                <textarea
                  name="antecedentes_al"
                  value={formData.antecedentes_al}
                  onChange={handleInputChange}
                  rows={2}
                  disabled={formData.antecedentes_al_nr}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_al_nr ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Escriba aquí"
                />
              </div>

              {/* Medicamentos Actuales (Tx) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Tx
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_tx_nr"
                      checked={formData.antecedentes_tx_nr}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    N/R
                  </label>
                </div>
                <textarea
                  name="antecedentes_tx"
                  value={formData.antecedentes_tx}
                  onChange={handleInputChange}
                  rows={2}
                  disabled={formData.antecedentes_tx_nr}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_tx_nr ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Escriba aquí"
                />
              </div>
            </div>

            {/* GyO Merarquia, G, P, Ab, CSTP - En la misma línea */}
            <div className="flex gap-4">
              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    GyO Merarquia
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_gyo_menarquia_na"
                      checked={formData.antecedentes_gyo_menarquia_na}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    No aplica
                  </label>
                </div>
                <input
                  type="text"
                  name="antecedentes_gyo_menarquia"
                  value={formData.antecedentes_gyo_menarquia}
                  onChange={handleInputChange}
                  disabled={formData.antecedentes_gyo_menarquia_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_gyo_menarquia_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Escriba aquí"
                />
              </div>

            {/* Menopausia */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Menopausia
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="antecedentes_menopausia_na"
                    checked={formData.antecedentes_menopausia_na}
                    onChange={handleCheckboxChange}
                    className="mr-1"
                  />
                  No aplica
                </label>
              </div>
              <input
                type="text"
                name="antecedentes_menopausia"
                value={formData.antecedentes_menopausia}
                onChange={handleInputChange}
                disabled={formData.antecedentes_menopausia_na}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                  formData.antecedentes_menopausia_na ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Escriba aquí"
              />
            </div>

              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    G
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_g_na"
                      checked={formData.antecedentes_g_na}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    No aplica
                  </label>
                </div>
                <input
                  type="text"
                  name="antecedentes_g"
                  value={formData.antecedentes_g}
                  onChange={handleInputChange}
                  disabled={formData.antecedentes_g_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_g_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 2"
                />
              </div>

              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    P
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_p_na"
                      checked={formData.antecedentes_p_na}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    No aplica
                  </label>
                </div>
                <input
                  type="text"
                  name="antecedentes_p"
                  value={formData.antecedentes_p}
                  onChange={handleInputChange}
                  disabled={formData.antecedentes_p_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_p_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 2"
                />
              </div>

              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Ab
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_ab_na"
                      checked={formData.antecedentes_ab_na}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    No aplica
                  </label>
                </div>
                <input
                  type="text"
                  name="antecedentes_ab"
                  value={formData.antecedentes_ab}
                  onChange={handleInputChange}
                  disabled={formData.antecedentes_ab_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_ab_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 2"
                />
              </div>

              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    CSTP
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="antecedentes_cstp_na"
                      checked={formData.antecedentes_cstp_na}
                      onChange={handleCheckboxChange}
                      className="mr-1"
                    />
                    No aplica
                  </label>
                </div>
                <input
                  type="text"
                  name="antecedentes_cstp"
                  value={formData.antecedentes_cstp}
                  onChange={handleInputChange}
                  disabled={formData.antecedentes_cstp_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.antecedentes_cstp_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 2"
                />
              </div>
            </div>

            {/* HV (Hijos Vivos) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  HV
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="hv_na"
                    checked={formData.hv_na}
                    onChange={handleCheckboxChange}
                    className="mr-1"
                  />
                  No aplica
                </label>
              </div>
              <input
                type="text"
                name="hv"
                value={formData.hv}
                onChange={handleInputChange}
                disabled={formData.hv_na}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                  formData.hv_na ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Ej: 3"
              />
            </div>

            {/* HM (Hijos Muertos) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  HM
                </label>
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="hm_na"
                    checked={formData.hm_na}
                    onChange={handleCheckboxChange}
                    className="mr-1"
                  />
                  No aplica
                </label>
              </div>
              <input
                type="text"
                name="hm"
                value={formData.hm}
                onChange={handleInputChange}
                disabled={formData.hm_na}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                  formData.hm_na ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
                placeholder="Ej: 3"
              />
            </div>
          </div>
        </div>

        {/* Signos Iniciales */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Signos Iniciales</h2>
          <div className="space-y-4">
            {/* Peso, Talla, HV, HM - En la misma línea */}
            <div className="flex gap-4">
              <div className="flex-1">
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
                    placeholder="Ej: 70"
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
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Talla
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Ej: 160"
                />
              </div>
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HV
                </label>
                <input
                  type="text"
                  name="hv"
                  value={formData.hv}
                  onChange={handleInputChange}
                  disabled={formData.hv_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.hv_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 3"
                />
              </div>
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HM
                </label>
                <input
                  type="text"
                  name="hm"
                  value={formData.hm}
                  onChange={handleInputChange}
                  disabled={formData.hm_na}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent ${
                    formData.hm_na ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ej: 3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Signos Vitales */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Signos Vitales</h2>
          <div className="flex gap-4">
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PA
              </label>
              <input
                type="text"
                name="blood_pressure"
                value={`${formData.blood_pressure_systolic || ''}/${formData.blood_pressure_diastolic || ''}`}
                onChange={(e) => {
                  const [systolic, diastolic] = e.target.value.split('/');
                  setFormData(prev => ({
                    ...prev,
                    blood_pressure_systolic: systolic || '',
                    blood_pressure_diastolic: diastolic || ''
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: 120/80"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FC
              </label>
              <input
                type="number"
                name="heart_rate"
                value={formData.heart_rate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: 80"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FR
              </label>
              <input
                type="number"
                name="respiratory_rate"
                value={formData.respiratory_rate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: 18"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                T
              </label>
              <input
                type="number"
                step="0.1"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: 37"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SpO2 %
              </label>
              <input
                type="number"
                name="oxygen_saturation"
                value={formData.oxygen_saturation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Ej: 98"
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
                Genitales
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

        {/* Conclusiones Médicas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Conclusiones Médicas</h2>
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
                placeholder="Escriba impresión clínica"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nuevos Datos
              </label>
              <textarea
                name="new_data"
                value={formData.new_data || ''}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Escriba nuevos hallazgos"
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
                placeholder="Escriba plan diagnóstico"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Tratamiento
              </label>
              <textarea
                name="treatment_plan"
                value={formData.treatment_plan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                placeholder="Escriba plan de tratamiento"
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

