const { promisePool } = require('../config/database');

// Controlador de gestión de órdenes médicas
class MedicalOrderController {
  // Obtener órdenes por ID de paciente
  static async getOrdersByPatientId(req, res) {
    try {
      const { patientId } = req.params;

      const [orders] = await promisePool.execute(
        `SELECT mo.*, u.name as doctor_name, p.first_name, p.last_name 
         FROM medical_orders mo 
         JOIN users u ON mo.doctor_id = u.id 
         JOIN patients p ON mo.patient_id = p.id 
         WHERE mo.patient_id = ? 
         ORDER BY mo.created_at DESC`,
        [patientId]
      );

      // Obtener ítems de cada orden
      for (let order of orders) {
        const [items] = await promisePool.execute(
          'SELECT * FROM medical_order_items WHERE order_id = ? ORDER BY created_at ASC',
          [order.id]
        );
        order.items = items;
      }

      res.json({
        orders,
        total: orders.length
      });

    } catch (error) {
      console.error('Error al obtener órdenes médicas:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las órdenes médicas'
      });
    }
  }

  // Crear nueva orden médica
  static async createMedicalOrder(req, res) {
    try {
      const { 
        patient_id,
        doctor_id,
        order_date,
        priority,
        notes,
        items
      } = req.body;

      // Validaciones básicas
      if (!patient_id || !doctor_id || !order_date || !items || items.length === 0) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: 'ID del paciente, doctor, fecha e ítems son requeridos'
        });
      }

      // Crear orden médica
      const [result] = await promisePool.execute(
        `INSERT INTO medical_orders (patient_id, doctor_id, order_date, priority, notes, created_at) 
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [patient_id, doctor_id, order_date, priority, notes]
      );

      const orderId = result.insertId;

      // Crear ítems de la orden
      for (let item of items) {
        await promisePool.execute(
          `INSERT INTO medical_order_items (order_id, item_type, description, quantity, unit, frequency, instructions, status, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [orderId, item.item_type, item.description, item.quantity, item.unit, item.frequency, item.instructions, 'pending']
        );
      }

      res.status(201).json({
        message: 'Orden médica creada exitosamente',
        order: {
          id: orderId,
          patient_id,
          doctor_id,
          order_date,
          priority,
          notes,
          items
        }
      });

    } catch (error) {
      console.error('Error al crear orden médica:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear la orden médica'
      });
    }
  }

  // Actualizar estado de ítem de orden
  static async updateOrderItemStatus(req, res) {
    try {
      const { itemId } = req.params;
      const { status, notes } = req.body;

      // Verificar si el ítem existe
      const [existingItem] = await promisePool.execute(
        'SELECT id FROM medical_order_items WHERE id = ?',
        [itemId]
      );

      if (existingItem.length === 0) {
        return res.status(404).json({
          error: 'Ítem no encontrado',
          message: 'El ítem de la orden no existe'
        });
      }

      // Actualizar estado del ítem
      await promisePool.execute(
        'UPDATE medical_order_items SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?',
        [status, notes, itemId]
      );

      res.json({
        message: 'Estado del ítem actualizado exitosamente',
        item: {
          id: parseInt(itemId),
          status,
          notes
        }
      });

    } catch (error) {
      console.error('Error al actualizar estado del ítem:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar el estado del ítem'
      });
    }
  }

  // Eliminar orden médica
  static async deleteMedicalOrder(req, res) {
    try {
      const { id } = req.params;

      // Verificar si la orden existe
      const [existingOrder] = await promisePool.execute(
        'SELECT id FROM medical_orders WHERE id = ?',
        [id]
      );

      if (existingOrder.length === 0) {
        return res.status(404).json({
          error: 'Orden no encontrada',
          message: 'La orden médica no existe'
        });
      }

      // Eliminar ítems primero
      await promisePool.execute(
        'DELETE FROM medical_order_items WHERE order_id = ?',
        [id]
      );

      // Eliminar orden
      await promisePool.execute(
        'DELETE FROM medical_orders WHERE id = ?',
        [id]
      );

      res.json({
        message: 'Orden médica eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar orden médica:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la orden médica'
      });
    }
  }
}

module.exports = MedicalOrderController;

