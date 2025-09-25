// Configuración de la aplicación
export const config = {
  // URL del backend API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  
  // Configuración de la aplicación
  APP_NAME: 'Sistema Hospital',
  APP_VERSION: '1.0.0',
  
  // Configuración de colores (coincide con Tailwind)
  COLORS: {
    primary: '#1E3A8A',
    secondary: '#059669',
    warning: '#F59E0B',
    danger: '#DC2626',
    neutral: '#6B7280',
    white: '#FFFFFF'
  },
  
  // Configuración de rutas
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard'
  }
};

