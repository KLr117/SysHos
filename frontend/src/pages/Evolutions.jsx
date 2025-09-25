import { useState, useEffect } from 'react';

const Evolutions = () => {
  const [evolutions, setEvolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    evolution_date: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    notes: ''
  });

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEvolutions([
        {
          id: 1,
          patient_name: 'Juan Pérez',
          doctor_name: 'Dr. Juan Pérez',
          evolution_date: '2024-01-15',
          subjective: 'Paciente refiere mejoría de síntomas',
          objective: 'Estado general estable, sin fiebre',
          assessment: 'Evolución favorable del resfriado',
          plan: 'Continuar con tratamiento actual',
          notes: 'Paciente colaborador, sin complicaciones'
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
    // Simular creación de evolución
    const newEvolution = {
      id: evolutions.length + 1,
      patient_name: 'Nuevo Paciente',
      doctor_name: 'Dr. Usuario',
      ...formData
    };
    setEvolutions([newEvolution, ...evolutions]);
    setShowModal(false);
    setFormData({
      patient_id: '',
      doctor_id: '',
      evolution_date: '',
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
      notes: ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hospital-blue mx-auto"></div>
          <p className="mt-4 text-hospital-gray">Cargando evoluciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evoluciones Médicas</h1>
          <p className="text-hospital-gray">Registro y seguimiento de notas médicas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-hospital-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Nueva Evolución
        </button>
      </div>

      {/* Lista de evoluciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Historial de Evoluciones</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {evolutions.map((evolution) => (
              <div key={evolution.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{evolution.patient_name}</h3>
                    <p className="text-sm text-hospital-gray">Dr. {evolution.doctor_name} - {evolution.evolution_date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-hospital-blue hover:text-blue-800 text-sm">Ver</button>
                    <button className="text-hospital-green hover:text-green-800 text-sm">Editar</button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Subjetivo:</p>
                    <p className="text-gray-600">{evolution.subjective}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Objetivo:</p>
                    <p className="text-gray-600">{evolution.objective}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Evaluación:</p>
                    <p className="text-gray-600">{evolution.assessment}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Plan:</p>
                    <p className="text-gray-600">{evolution.plan}</p>
                  </div>
                </div>
                
                {evolution.notes && (
                  <div className="mt-3">
                    <p className="font-medium text-gray-700 mb-1">Notas:</p>
                    <p className="text-gray-600">{evolution.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para nueva evolución */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Nueva Evolución Médica</h2>
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
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="evolution_date"
                    value={formData.evolution_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjetivo
                </label>
                <textarea
                  name="subjective"
                  value={formData.subjective}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Síntomas referidos por el paciente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo
                </label>
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Hallazgos del examen físico"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evaluación
                </label>
                <textarea
                  name="assessment"
                  value={formData.assessment}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Diagnóstico y evaluación clínica"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <textarea
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Plan de tratamiento y seguimiento"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
                  placeholder="Notas adicionales"
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
                  Crear Evolución
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evolutions;

