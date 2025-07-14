const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart.model');

const {
  verCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} = require('../controllers/cart.controller');

// Ver carrito
router.get('/', verCarrito);

// Agregar producto al carrito
router.post('/agregar', (req, res) => {
  const user = req.user;
  if (!user) return res.redirect('/users/login');

  const { producto_id, cantidad } = req.body;
  try {
    CartModel.agregarProducto(user.userId, parseInt(producto_id), parseInt(cantidad));
    res.redirect('/carrito');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar al carrito');
  }
});


// Eliminar un producto del carrito
router.post('/eliminar/:id', eliminarDelCarrito);

// Vaciar carrito
router.post('/vaciar', vaciarCarrito);

module.exports = router;
