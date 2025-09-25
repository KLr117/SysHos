const express = require('express');
const router = express.Router();

// Rutas de prueba
router.get('/', (req, res) => {
  res.json({ 
    message: 'API del Sistema Hospital',
    version: '1.0.0',
    status: 'OK'
  });
});

// Rutas de salud
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

