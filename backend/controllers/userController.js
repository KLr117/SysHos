const UserModel = require('../models/userModel');

// Controlador de gestión de usuarios
class UserController {
  // Obtener todos los usuarios (solo administradores)
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();

      res.json({
        users,
        total: users.length
      });

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Obtener usuario por ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.getUserById(id);

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
      console.error('Error al obtener usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Crear nuevo usuario
  static async createUser(req, res) {
    try {
      const { nombre_usuario, contrasena, nombre_completo, fk_id_rol, email, numero_registro, activo } = req.body;

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
        numero_registro,
        activo: activo !== undefined ? activo : true
      });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        user: {
          id: userId,
          nombre_usuario,
          nombre_completo,
          fk_id_rol,
          email,
          numero_registro,
          activo: activo !== undefined ? activo : true
        }
      });

    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Actualizar usuario
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nombre_usuario, nombre_completo, contrasena, fk_id_rol, email, numero_registro, activo } = req.body;

      // Verificar si el usuario existe
      const existingUser = await UserModel.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      // Actualizar usuario usando el modelo
      await UserModel.updateUser(id, {
        nombre_usuario,
        nombre_completo,
        contrasena,
        fk_id_rol,
        email,
        numero_registro,
        activo
      });

      res.json({
        message: 'Usuario actualizado exitosamente',
        user: {
          id: parseInt(id),
          nombre_usuario,
          nombre_completo,
          fk_id_rol,
          email,
          numero_registro,
          activo
        }
      });

    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Eliminar usuario
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el usuario existe
      const existingUser = await UserModel.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      // Eliminar usuario usando el modelo
      await UserModel.deleteUser(id);

      res.json({
        message: 'Usuario eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }

  // Obtener roles disponibles
  static async getRoles(req, res) {
    try {
      const roles = await UserModel.getRoles();

      res.json({
        roles
      });

    } catch (error) {
      console.error('Error al obtener roles:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }
  }
}

module.exports = UserController;

