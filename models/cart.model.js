// models/cart.model.js
const db = require("../config/db");

function getCartByUserId(userId) {
  const stmt = db.prepare(`
    SELECT c.id, p.nombre, p.descripcion, p.precio, c.cantidad
    FROM carrito c
    JOIN productos p ON c.producto_id = p.id
    WHERE c.user_id = ?
  `);
  return stmt.all(userId);
}

function agregarProducto(user_id, producto_id, cantidad) {
  const existe = db.prepare(`
    SELECT * FROM carrito WHERE user_id = ? AND producto_id = ?
  `).get(user_id, producto_id);

  if (existe) {
    db.prepare(`
      UPDATE carrito SET cantidad = cantidad + ?
      WHERE user_id = ? AND producto_id = ?
    `).run(cantidad, user_id, producto_id);
  } else {
    db.prepare(`
      INSERT INTO carrito (user_id, producto_id, cantidad)
      VALUES (?, ?, ?)
    `).run(user_id, producto_id, cantidad);
  }
}


function removeFromCart(userId, productoId) {
  db.prepare("DELETE FROM carrito WHERE user_id = ? AND producto_id = ?").run(userId, productoId);
}

function clearCart(userId) {
  db.prepare("DELETE FROM carrito WHERE user_id = ?").run(userId);
}

module.exports = {
  getCartByUserId,
  agregarProducto,
  removeFromCart,
  clearCart
};
