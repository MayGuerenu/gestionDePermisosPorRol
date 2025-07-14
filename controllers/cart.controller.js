const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

function verCarrito(req, res) {
  const user = req.user;
  if (!user) return res.redirect('/users/login');

  const items = Cart.getCartByUserId(user.userId);
  res.render('carrito/carrito', { items });
}

function agregarAlCarrito(req, res) {
  const user = req.user;
  const productoId = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad || 1);

  if (!user) return res.redirect('/users/login');

  const producto = Product.getById(productoId);
  if (!producto) return res.status(404).send('Producto no encontrado');

  Cart.addToCart(user.userId, productoId, cantidad);
  res.redirect('/carrito');
}

function eliminarDelCarrito(req, res) {
  const user = req.user;
  const productoId = parseInt(req.params.id);

  if (!user) return res.redirect('/users/login');

  Cart.removeFromCart(user.userId, productoId);
  res.redirect('/carrito');
}

function vaciarCarrito(req, res) {
  const user = req.user;
  if (!user) return res.redirect('/users/login');

  Cart.clearCart(user.userId);
  res.redirect('/carrito');
}

module.exports = {
  verCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
  vaciarCarrito
};
