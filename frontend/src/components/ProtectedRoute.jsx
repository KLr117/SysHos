import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si se requieren roles específicos, verificar permisos
  if (requiredRoles.length > 0 && user) {
    const hasPermission = authService.hasAnyRole(requiredRoles);
    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

