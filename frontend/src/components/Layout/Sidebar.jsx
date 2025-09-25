import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: '🏠',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Ingreso de Paciente',
      path: '/patient-admission',
      icon: '🏥',
      roles: ['admin', 'medico']
    },
    {
      name: 'Pacientes',
      path: '/patients',
      icon: '👥',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Expedientes',
      path: '/medical-records',
      icon: '📋',
      roles: ['admin', 'medico']
    },
    {
      name: 'Evolución',
      path: '/evolutions',
      icon: '📝',
      roles: ['admin', 'medico']
    },
    {
      name: 'Órdenes Médicas',
      path: '/medical-orders',
      icon: '📋',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Medicamentos',
      path: '/medications',
      icon: '💊',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Signos Vitales',
      path: '/vital-signs',
      icon: '❤️',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Notas Enfermería',
      path: '/nursing-notes',
      icon: '👩‍⚕️',
      roles: ['admin', 'enfermeria']
    },
    {
      name: 'Gastos',
      path: '/expenses',
      icon: '💰',
      roles: ['admin', 'medico', 'enfermeria']
    },
    {
      name: 'Usuarios',
      path: '/users',
      icon: '👤',
      roles: ['admin']
    },
    {
      name: 'Reportes',
      path: '/reports',
      icon: '📊',
      roles: ['admin', 'medico']
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-hospital-blue text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-hospital-green rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏥</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Sistema Hospital</h1>
            <p className="text-sm text-blue-200">Gestión Médica</p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-hospital-green text-white'
                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <div className="bg-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-hospital-green rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">Usuario</p>
              <p className="text-xs text-blue-200">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
