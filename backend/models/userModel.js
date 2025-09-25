const bcrypt = require('bcrypt');
const { promisePool } = require('../config/database');

// Modelo de gestión de usuarios
class UserModel {
  // Obtener todos los usuarios
  static async getAllUsers() {
    try {
      const [users] = await promisePool.execute(`
        SELECT 
          u.pk_id_usuario,
          u.nombre_usuario,
          u.nombre_completo,
          u.fk_id_rol,
          u.email,
          u.numero_registro,
          u.activo,
          r.nombre AS rol_nombre
        FROM tbl_usuarios u
        LEFT JOIN tbl_roles r ON u.fk_id_rol = r.pk_id_rol
        ORDER BY u.pk_id_usuario DESC
      `);
      return users;
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  }

  // Obtener usuario por ID
  static async getUserById(id) {
    try {
      const [users] = await promisePool.execute(`
        SELECT 
          u.pk_id_usuario,
          u.nombre_usuario,
          u.nombre_completo,
          u.fk_id_rol,
          u.email,
          u.numero_registro,
          u.activo,
          r.nombre AS rol_nombre
        FROM tbl_usuarios u
        LEFT JOIN tbl_roles r ON u.fk_id_rol = r.pk_id_rol
        WHERE u.pk_id_usuario = ?
      `, [id]);
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  }

  // Obtener usuario por nombre de usuario
  static async getUserByUsername(username) {
    try {
      const [users] = await promisePool.execute(`
        SELECT 
          u.pk_id_usuario,
          u.nombre_usuario,
          u.nombre_completo,
          u.fk_id_rol,
          u.email,
          u.numero_registro,
          u.activo,
          u.contrasena,
          r.nombre AS rol_nombre
        FROM tbl_usuarios u
        LEFT JOIN tbl_roles r ON u.fk_id_rol = r.pk_id_rol
        WHERE u.nombre_usuario = ? AND u.activo = 1
      `, [username]);
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      throw new Error('Error al obtener usuario por nombre: ' + error.message);
    }
  }

  // Verificar si el nombre de usuario existe
  static async usernameExists(username, excludeId = null) {
    try {
      let query = 'SELECT pk_id_usuario FROM tbl_usuarios WHERE nombre_usuario = ?';
      let params = [username];
      
      if (excludeId) {
        query += ' AND pk_id_usuario != ?';
        params.push(excludeId);
      }
      
      const [users] = await promisePool.execute(query, params);
      return users.length > 0;
    } catch (error) {
      throw new Error('Error al verificar nombre de usuario: ' + error.message);
    }
  }

  // Crear nuevo usuario
  static async createUser(userData) {
    try {
      const {
        nombre_usuario,
        nombre_completo,
        contrasena,
        fk_id_rol,
        email,
        numero_registro,
        activo = true
      } = userData;

      // Verificar que el nombre de usuario sea único
      const usernameExists = await this.usernameExists(nombre_usuario);
      if (usernameExists) {
        throw new Error('El nombre de usuario ya existe');
      }

      // Hash de la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

      // Crear usuario
      const [result] = await promisePool.execute(`
        INSERT INTO tbl_usuarios (
          nombre_usuario, 
          nombre_completo, 
          contrasena, 
          fk_id_rol, 
          email, 
          numero_registro, 
          activo
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        nombre_usuario,
        nombre_completo,
        hashedPassword,
        fk_id_rol,
        email || null,
        numero_registro || null,
        activo
      ]);

      return result.insertId;
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }

  // Actualizar usuario
  static async updateUser(id, userData) {
    try {
      const {
        nombre_usuario,
        nombre_completo,
        contrasena,
        fk_id_rol,
        email,
        numero_registro,
        activo
      } = userData;

      // Verificar que el nombre de usuario sea único (excluyendo el usuario actual)
      const usernameExists = await this.usernameExists(nombre_usuario, id);
      if (usernameExists) {
        throw new Error('El nombre de usuario ya existe');
      }

      // Construir query dinámicamente
      let query = 'UPDATE tbl_usuarios SET ';
      let params = [];
      let fields = [];

      if (nombre_usuario !== undefined) {
        fields.push('nombre_usuario = ?');
        params.push(nombre_usuario);
      }

      if (nombre_completo !== undefined) {
        fields.push('nombre_completo = ?');
        params.push(nombre_completo);
      }

      if (contrasena !== undefined && contrasena !== '') {
        // Hash de la nueva contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        fields.push('contrasena = ?');
        params.push(hashedPassword);
      }

      if (fk_id_rol !== undefined) {
        fields.push('fk_id_rol = ?');
        params.push(fk_id_rol);
      }

      if (email !== undefined) {
        fields.push('email = ?');
        params.push(email || null);
      }

      if (numero_registro !== undefined) {
        fields.push('numero_registro = ?');
        params.push(numero_registro || null);
      }

      if (activo !== undefined) {
        fields.push('activo = ?');
        params.push(activo);
      }

      if (fields.length === 0) {
        throw new Error('No hay campos para actualizar');
      }

      query += fields.join(', ') + ' WHERE pk_id_usuario = ?';
      params.push(id);

      await promisePool.execute(query, params);
      return true;
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  }

  // Eliminar usuario
  static async deleteUser(id) {
    try {
      await promisePool.execute(
        'DELETE FROM tbl_usuarios WHERE pk_id_usuario = ?',
        [id]
      );
      return true;
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new Error('Error al verificar contraseña: ' + error.message);
    }
  }

  // Obtener roles disponibles
  static async getRoles() {
    try {
      const [roles] = await promisePool.execute(`
        SELECT pk_id_rol, nombre, descripcion
        FROM tbl_roles
        ORDER BY pk_id_rol
      `);
      return roles;
    } catch (error) {
      throw new Error('Error al obtener roles: ' + error.message);
    }
  }
}

module.exports = UserModel;
