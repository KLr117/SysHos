const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Controlador de autenticación
class AuthController {
  // Registro de usuario (para uso futuro)
  static async register(req, res) {
    try {
      const { nombre_usuario, contrasena, nombre_completo, fk_id_rol, email, numero_registro } = req.body;
      
      // Validaciones básicas
      if (!nombre_usuario || !contrasena || !nombre_completo || !fk_id_rol) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Nombre de usuario, contraseña, nombre completo y rol son requeridos'
        });
      }

      // Crear usuario usando el modelo
      const userId = await UserModel.createUser({
        nombre_usuario,
        contrasena,
        nombre_completo,
        fk_id_rol,
        email,
        numero_registro
      });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        userId: userId
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Login de usuario
  static async login(req, res) {
    try {
      const { nombre_usuario, contrasena } = req.body;

      // Validaciones básicas
      if (!nombre_usuario || !contrasena) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'Nombre de usuario y contraseña son requeridos'
        });
      }

      // Buscar usuario por nombre de usuario
      const user = await UserModel.getUserByUsername(nombre_usuario);

      if (!user) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Nombre de usuario o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const isValidPassword = await UserModel.verifyPassword(contrasena, user.contrasena);
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Nombre de usuario o contraseña incorrectos'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: user.pk_id_usuario, 
          nombre_usuario: user.nombre_usuario, 
          nombre_completo: user.nombre_completo, 
          fk_id_rol: user.fk_id_rol 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user.pk_id_usuario,
          nombre_usuario: user.nombre_usuario,
          nombre_completo: user.nombre_completo,
          fk_id_rol: user.fk_id_rol,
          email: user.email,
          numero_registro: user.numero_registro,
          activo: user.activo
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

      const user = await UserModel.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      res.json({
        user: {
          id: user.pk_id_usuario,
          nombre_usuario: user.nombre_usuario,
          nombre_completo: user.nombre_completo,
          fk_id_rol: user.fk_id_rol,
          email: user.email,
          numero_registro: user.numero_registro,
          activo: user.activo,
          rol_nombre: user.rol_nombre
        }
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
