const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar middlewares
const mockData = require('./middlewares/mockData');

// Importar rutas
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const patientRoutes = require('./routes/patients');
const medicalRecordRoutes = require('./routes/medicalRecords');
const evolutionRoutes = require('./routes/evolutions');
const medicalOrderRoutes = require('./routes/medicalOrders');
const medicationRoutes = require('./routes/medications');
const vitalSignsRoutes = require('./routes/vitalSigns');
const nursingNotesRoutes = require('./routes/nursingNotes');
const medicationApplicationRoutes = require('./routes/medicationApplications');
const expensesRoutes = require('./routes/expenses');

// Usar middleware de datos mock
app.use(mockData);

// Usar rutas
app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/evolutions', evolutionRoutes);
app.use('/api/medical-orders', medicalOrderRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/vital-signs', vitalSignsRoutes);
app.use('/api/nursing-notes', nursingNotesRoutes);
app.use('/api/medication-applications', medicationApplicationRoutes);
app.use('/api/expenses', expensesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'Sistema Hospital - Backend API',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});

const pool = require('./config/database');

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Conexión a BD exitosa:', rows[0].result);
  } catch (error) {
    console.error('❌ Error de conexión a BD:', error.message);
  }
})();


module.exports = app;
