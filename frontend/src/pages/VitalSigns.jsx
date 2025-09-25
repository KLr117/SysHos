import { useState, useEffect } from 'react';

const VitalSigns = () => {
  const [vitalSigns, setVitalSigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    recorded_at: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    heart_rate: '',
    respiratory_rate: '',
    temperature: '',
    oxygen_saturation: '',
    oxygen_flow: '',
    pain_level: '',
    consciousness_level: '',
    notes: ''
  });

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setVitalSigns([
        {
          id: 1,
          patient_name: 'Juan Pérez',
          recorded_by_name: 'Enfermera María García',
          recorded_at: '2024-01-15 10:30',
          blood_pressure_systolic: 120,
          blood_pressure_diastolic: 80,
          heart_rate: 72,
          respiratory_rate: 18,
          temperature: 37.2,
          oxygen_saturation: 98,
          oxygen_flow: 0,
          pain_level: 3,
          consciousness_level: 'Consciente',
          notes: 'Signos vitales estables'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular creación de signos vitales
    const newVitalSigns = {
      id: vitalSigns.length + 1,
      patient_name: 'Nuevo Paciente',
      recorded_by_name: 'Usuario Actual',
      ...formData
    };
    setVitalSigns([newVitalSigns, ...vitalSigns]);
    setShowModal(false);
    setFormData({
      patient_id: '',
      recorded_at: '',
      blood_pressure_systolic: '',
      blood_pressure_diastolic: '',
      heart_rate: '',
      respiratory_rate: '',
      temperature: '',
      oxygen_saturation: '',
      oxygen_flow: '',
      pain_level: '',
      consciousness_level: '',
      notes: ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hospital-blue mx-auto"></div>
          <p className="mt-4 text-hospital-gray">Cargando signos vitales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Signos Vitales</h1>
          <p className="text-hospital-gray">Registro y monitoreo de signos vitales</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-hospital-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Registro
        </button>
      </div>

      {/* Lista de signos vitales */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Registros de Signos Vitales</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P/A
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  T°
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SpO2
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitalSigns.map((vital) => (
                <tr key={vital.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vital.patient_name}</div>
                      <div className="text-sm text-gray-500">{vital.recorded_by_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.recorded_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.blood_pressure_systolic}/{vital.blood_pressure_diastolic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.heart_rate} bpm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.respiratory_rate} rpm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.temperature}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vital.oxygen_saturation}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-hospital-blue hover:text-blue-800">Ver</button>
                      <button className="text-hospital-green hover:text-green-800">Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para nuevo registro */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nuevo Registro de Signos Vitales</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paciente
                  </label>
                  <select
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                    required
                  >
                    <option value="">Seleccionar paciente</option>
                    <option value="1">Juan Pérez</option>
                    <option value="2">María García</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha y Hora
                  </label>
                  <input
                    type="datetime-local"
                    name="recorded_at"
                    value={formData.recorded_at}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presión Arterial Sistólica
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
                    Presión Arterial Diastólica
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
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frecuencia Cardíaca
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
                    Frecuencia Respiratoria
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
                    Temperatura
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                    placeholder="37.2"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Saturación de Oxígeno
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flujo de Oxígeno
                  </label>
                  <input
                    type="number"
                    name="oxygen_flow"
                    value={formData.oxygen_flow}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de Dolor
                  </label>
                  <select
                    name="pain_level"
                    value={formData.pain_level}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  >
                    <option value="">Seleccionar</option>
                    <option value="0">0 - Sin dolor</option>
                    <option value="1">1-3 - Dolor leve</option>
                    <option value="4">4-6 - Dolor moderado</option>
                    <option value="7">7-10 - Dolor severo</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de Conciencia
                </label>
                <select
                  name="consciousness_level"
                  value={formData.consciousness_level}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                >
                  <option value="">Seleccionar</option>
                  <option value="Consciente">Consciente</option>
                  <option value="Somnoliento">Somnoliento</option>
                  <option value="Estuporoso">Estuporoso</option>
                  <option value="Comatoso">Comatoso</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Observaciones adicionales"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-hospital-blue hover:bg-blue-800 text-white rounded-lg transition-colors"
                >
                  Registrar Signos Vitales
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VitalSigns;

