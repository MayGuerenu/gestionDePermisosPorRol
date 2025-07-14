const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

// Obtener todos los productos (sin restricción)
router.get('/', (req, res) => {
  const nombre = req.query.nombre || '';
  const productos = Product.getAll(nombre);
  res.render('productos', { productos, filtro: nombre });
});

// Mostrar formulario de nuevo producto (solo admin)
router.get('/new', (req, res) => {
  const currentUser = req.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.redirect('/productos');
  }

  res.render('productos/new');
});

// Crear producto (solo admin)
router.post('/', (req, res) => {
  const currentUser = req.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.redirect('/productos');
  }

  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || isNaN(precio)) {
    return res.status(400).send('Datos inválidos');
  }

  Product.create(nombre, descripcion, Number(precio));
  res.redirect('/productos');
});

// Mostrar formulario para editar producto (solo admin)
router.get('/:id/edit', (req, res) => {
  const currentUser = req.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.redirect('/productos');
  }

  const producto = Product.getById(parseInt(req.params.id));
  if (!producto) return res.status(404).send('Producto no encontrado');

  res.render('productos/edit', { producto });
});

// Editar producto (solo admin)
router.post('/:id', (req, res) => {
  const currentUser = req.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.redirect('/productos');
  }

  const id = parseInt(req.params.id);
  const { nombre, descripcion, precio } = req.body;

  const producto = Product.getById(id);
  if (!producto) return res.status(404).send('Producto no encontrado');

  Product.update(id, nombre, descripcion, Number(precio));
  res.redirect('/productos');
});

// Eliminar producto (solo admin)
router.post('/:id/delete', (req, res) => {
  const currentUser = req.user;
  if (!currentUser || currentUser.role !== 'admin') {
    return res.redirect('/productos');
  }

  const id = parseInt(req.params.id);
  const producto = Product.getById(id);
  if (!producto) return res.status(404).send('Producto no encontrado');

  Product.delete(id);
  res.redirect('/productos');
});


module.exports = router;
