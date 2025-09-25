import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Forzar redirección aunque falle la petición
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo y título */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-hospital-blue rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🏥</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-hospital-blue">Sistema Hospital</h1>
            <p className="text-sm text-hospital-gray">Gestión Médica Integral</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-hospital-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar pacientes, expedientes..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none transition-colors ${
                isSearchFocused
                  ? 'border-hospital-blue ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Notificaciones y perfil */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="relative p-2 text-hospital-gray hover:text-hospital-blue transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM5 7h14l-7-7-7 7z" />
            </svg>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-hospital-red rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </button>

          {/* Perfil del usuario */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-hospital-green rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">U</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{user?.nombre_completo || 'Usuario'}</p>
                <p className="text-xs text-hospital-gray">
                  {user?.fk_id_rol === 1 ? 'Administrador' : 
                   user?.fk_id_rol === 2 ? 'Médico' : 
                   user?.fk_id_rol === 3 ? 'Enfermería' : 'Usuario'}
                </p>
              </div>
              <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown del perfil */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Configuración
                </a>
                <hr className="my-2" />
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-hospital-red hover:bg-red-50"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

