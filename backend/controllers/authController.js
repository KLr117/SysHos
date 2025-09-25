const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisePool } = require('../config/database');

// Controlador de autenticación
class AuthController {
  // Registro de usuario (para uso futuro)
  static async register(req, res) {
    try {
      const { email, password, name, role } = req.body;
      
      // Validaciones básicas
      if (!email || !password || !name) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Email, contraseña y nombre son requeridos'
        });
      }

      // Verificar si el usuario ya existe
      const [existingUser] = await promisePool.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          error: 'Usuario existente',
          message: 'Ya existe un usuario con este email'
        });
      }

      // Hash de la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Crear usuario
      const [result] = await promisePool.execute(
        'INSERT INTO users (email, password, name, role, created_at) VALUES (?, ?, ?, ?, NOW())',
        [email, hashedPassword, name, role || 'user']
      );

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        userId: result.insertId
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el usuario'
      });
    }
  }

  // Login de usuario
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Email y contraseña son requeridos'
        });
      }

      // Buscar usuario
      const [users] = await promisePool.execute(
        'SELECT id, email, password, name, role FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Email o contraseña incorrectos'
        });
      }

      const user = users[0];

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Email o contraseña incorrectos'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo procesar el login'
      });
    }
  }

  // Obtener perfil del usuario autenticado
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const [users] = await promisePool.execute(
        'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
        [userId]
      );

      if (users.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      res.json({
        user: users[0]
      });

    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el perfil del usuario'
      });
    }
  }

  // Logout del usuario
  static async logout(req, res) {
    try {
      // En un sistema real, aquí se invalidaría el token
      // Por ahora solo confirmamos el logout
      res.json({
        message: 'Logout exitoso',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo procesar el logout'
      });
    }
  }
}

module.exports = AuthController;
