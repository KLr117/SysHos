import api from './api';

class AuthService {
  // Login
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      // Limpiar datos locales aunque falle la petición
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Obtener usuario actual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  }
}

export default new AuthService();

