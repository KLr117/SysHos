const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acceso requerido',
      message: 'Debe proporcionar un token de autenticación'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      });
    }
    
    req.user = user;
    next();
  });
};

// Middleware de validación de roles (para uso futuro)
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Usuario no autenticado',
        message: 'Debe estar autenticado para acceder a este recurso'
      });
    }

    // Mapear fk_id_rol a nombres de roles
    const roleMap = {
      1: 'admin',
      2: 'medico', 
      3: 'enfermeria'
    };
    
    const userRole = roleMap[req.user.fk_id_rol];
    
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ 
        error: 'Acceso denegado',
        message: 'No tiene permisos para acceder a este recurso'
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};

