import api from './api';

class AuthService {
  // Login
  async login(nombre_usuario, contrasena) {
    try {
      const response = await api.post('/auth/login', {
        nombre_usuario,
        contrasena
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
    } catch (error) {
      // Continuar con el logout aunque falle la petición
      console.error('Error en logout del servidor:', error);
    } finally {
      // Limpiar datos locales siempre
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Emitir evento personalizado para notificar el logout
      window.dispatchEvent(new CustomEvent('auth-logout'));
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
    if (!user) return false;
    
    // Mapear fk_id_rol a nombres de roles
    const roleMap = {
      1: 'admin',
      2: 'medico', 
      3: 'enfermeria'
    };
    
    const userRole = roleMap[user.fk_id_rol];
    return userRole === role;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Mapear fk_id_rol a nombres de roles
    const roleMap = {
      1: 'admin',
      2: 'medico', 
      3: 'enfermeria'
    };
    
    const userRole = roleMap[user.fk_id_rol];
    return roles.includes(userRole);
  }
}

export default new AuthService();

