const bcrypt = require('bcrypt');
const { promisePool } = require('../config/database');

// Controlador de gestión de usuarios
class UserController {
  // Obtener todos los usuarios (solo administradores)
  static async getAllUsers(req, res) {
    try {
      const [users] = await promisePool.execute(
        'SELECT id, email, name, role, created_at, updated_at FROM users ORDER BY created_at DESC'
      );

      res.json({
        users,
        total: users.length
      });

    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener los usuarios'
      });
    }
  }

  // Obtener usuario por ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const [users] = await promisePool.execute(
        'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?',
        [id]
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
      console.error('Error al obtener usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo obtener el usuario'
      });
    }
  }

  // Crear nuevo usuario
  static async createUser(req, res) {
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
        user: {
          id: result.insertId,
          email,
          name,
          role: role || 'user'
        }
      });

    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el usuario'
      });
    }
  }

  // Actualizar usuario
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, name, role } = req.body;

      // Verificar si el usuario existe
      const [existingUser] = await promisePool.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      // Actualizar usuario
      await promisePool.execute(
        'UPDATE users SET email = ?, name = ?, role = ?, updated_at = NOW() WHERE id = ?',
        [email, name, role, id]
      );

      res.json({
        message: 'Usuario actualizado exitosamente',
        user: {
          id: parseInt(id),
          email,
          name,
          role
        }
      });

    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el usuario'
      });
    }
  }

  // Eliminar usuario
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Verificar si el usuario existe
      const [existingUser] = await promisePool.execute(
        'SELECT id FROM users WHERE id = ?',
        [id]
      );

      if (existingUser.length === 0) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          message: 'El usuario no existe'
        });
      }

      // Eliminar usuario
      await promisePool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Usuario eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar el usuario'
      });
    }
  }
}

module.exports = UserController;

