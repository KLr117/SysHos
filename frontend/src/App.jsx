import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientAdmission from './pages/PatientAdmission';
import Evolutions from './pages/Evolutions';
import VitalSigns from './pages/VitalSigns';
import Users from './pages/Users';
import authService from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();

    // Listener para detectar cambios en el localStorage
    const handleStorageChange = () => {
      checkAuth();
    };

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Escuchar evento personalizado de logout
    window.addEventListener('auth-logout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-logout', handleStorageChange);
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-hospital-blue to-hospital-green flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patient-admission"
          element={
            <ProtectedRoute requiredRoles={['admin', 'medico']}>
              <Layout>
                <PatientAdmission />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patients"
          element={
            <ProtectedRoute requiredRoles={['admin', 'medico', 'enfermeria']}>
              <Layout>
                <Patients />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/evolutions"
          element={
            <ProtectedRoute requiredRoles={['admin', 'medico']}>
              <Layout>
                <Evolutions />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/vital-signs"
          element={
            <ProtectedRoute requiredRoles={['admin', 'medico', 'enfermeria']}>
              <Layout>
                <VitalSigns />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;