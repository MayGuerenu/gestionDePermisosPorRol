const Product = require("../models/product.model");

function listarProductos(req, res) {
  const filtro = req.query.nombre || '';
  const productos = Product.getAll(filtro);
  res.render("productos/index", { productos, filtro });
}

function obtenerProducto(req, res) {
  const id = parseInt(req.params.id);
  const producto = Product.getById(id);
  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }
  res.render("productos/detail", { producto });
}

function formNuevoProducto(req, res) {
  res.render("productos/new");
}

function agregarProducto(req, res) {
  const { nombre, descripcion, precio } = req.body;
  try {
    Product.create(nombre, descripcion, parseFloat(precio));
    res.redirect("/productos");
  } catch (err) {
    res.status(400).send("Error al crear producto");
  }
}

function formEditarProducto(req, res) {
  const id = parseInt(req.params.id);
  const producto = Product.getById(id);
  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }
  res.render("productos/edit", { producto });
}

function modificarProducto(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, precio } = req.body;
  try {
    Product.update(id, nombre, descripcion, parseFloat(precio));
    res.redirect("/productos");
  } catch (err) {
    res.status(400).send("Error al actualizar producto");
  }
}

function eliminarProducto(req, res) {
  const id = parseInt(req.params.id);
  try {
    Product.delete(id);
    res.redirect("/productos");
  } catch (err) {
    res.status(400).send("Error al eliminar producto");
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  formNuevoProducto,
  agregarProducto,
  formEditarProducto,
  modificarProducto,
  eliminarProducto
};
