import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular login (por ahora)
      if (formData.email === 'admin@hospital.com' && formData.password === 'admin123') {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: 'admin@hospital.com',
          name: 'Dr. Administrador',
          role: 'admin'
        }));
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hospital-blue to-hospital-green flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-hospital-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white">🏥</span>
          </div>
          <h1 className="text-2xl font-bold text-hospital-blue">Sistema Hospital</h1>
          <p className="text-hospital-gray">Iniciar Sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-hospital-red bg-opacity-10 border border-hospital-red text-hospital-red px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hospital-blue focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-hospital-blue hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-hospital-gray">
            Credenciales de prueba:
          </p>
          <p className="text-xs text-hospital-gray mt-2">
            Email: admin@hospital.com<br />
            Contraseña: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

