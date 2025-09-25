import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalUsers: 0,
    totalRecords: 0,
    todayVisits: 0
  });

  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    setStats({
      totalPatients: 156,
      totalUsers: 24,
      totalRecords: 342,
      todayVisits: 12
    });

    setRecentPatients([
      { id: 1, name: 'Juan Pérez', lastVisit: '2024-01-15', status: 'Activo' },
      { id: 2, name: 'María García', lastVisit: '2024-01-14', status: 'Activo' },
      { id: 3, name: 'Carlos López', lastVisit: '2024-01-13', status: 'Activo' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-hospital-gray">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-hospital-gray">Resumen del sistema hospitalario</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pacientes"
          value={stats.totalPatients}
          icon="👥"
          color="bg-hospital-blue bg-opacity-10"
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.totalUsers}
          icon="👤"
          color="bg-hospital-green bg-opacity-10"
        />
        <StatCard
          title="Expedientes"
          value={stats.totalRecords}
          icon="📋"
          color="bg-hospital-yellow bg-opacity-10"
        />
        <StatCard
          title="Visitas Hoy"
          value={stats.todayVisits}
          icon="🏥"
          color="bg-hospital-red bg-opacity-10"
        />
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pacientes recientes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pacientes Recientes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-hospital-gray">Última visita: {patient.lastVisit}</p>
                  </div>
                  <span className="px-3 py-1 bg-hospital-green bg-opacity-10 text-hospital-green text-sm font-medium rounded-full">
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-hospital-blue bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">👥</span>
                  <p className="text-sm font-medium text-hospital-blue">Nuevo Paciente</p>
                </div>
              </button>
              <button className="p-4 bg-hospital-green bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">📋</span>
                  <p className="text-sm font-medium text-hospital-green">Nuevo Expediente</p>
                </div>
              </button>
              <button className="p-4 bg-hospital-yellow bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">📊</span>
                  <p className="text-sm font-medium text-hospital-yellow">Generar Reporte</p>
                </div>
              </button>
              <button className="p-4 bg-hospital-red bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors">
                <div className="text-center">
                  <span className="text-2xl block mb-2">⚕️</span>
                  <p className="text-sm font-medium text-hospital-red">Urgencias</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

