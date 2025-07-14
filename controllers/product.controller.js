const Product = require("../models/productModel");

function listarProductos(req, res) {
  const filtro = req.query.nombre || '';
  try {
    const productos = Product.getAllProducts(filtro);
    res.render("productos", { productos, filtro });
  } catch (err) {
    res.status(500).send("Error al obtener productos");
  }
}

function obtenerProducto(req, res) {
  const id = parseInt(req.params.id);
  try {
    const producto = Product.getProductById(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.render("productos/detail", { producto });
  } catch (err) {
    res.status(500).send("Error al obtener producto");
  }
}

function formNuevoProducto(req, res) {
  res.render("productos/new");
}

function agregarProducto(req, res) {
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || isNaN(parseFloat(precio))) {
    return res.status(400).send("Datos inválidos");
  }
  try {
    Product.createProduct(nombre, descripcion, parseFloat(precio));
    res.redirect("/productos");
  } catch (err) {
    res.status(500).send("Error al crear producto");
  }
}

function formEditarProducto(req, res) {
  const id = parseInt(req.params.id);
  try {
    const producto = Product.getProductById(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.render("productos/edit", { producto });
  } catch (err) {
    res.status(500).send("Error al obtener producto para edición");
  }
}

function modificarProducto(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, descripcion, precio } = req.body;
  if (!nombre || !descripcion || isNaN(parseFloat(precio))) {
    return res.status(400).send("Datos inválidos");
  }
  try {
    Product.updateProduct(id, nombre, descripcion, parseFloat(precio));
    res.redirect("/productos");
  } catch (err) {
    res.status(500).send("Error al actualizar producto");
  }
}

function eliminarProducto(req, res) {
  const id = parseInt(req.params.id);
  try {
    Product.deleteProduct(id);
    res.redirect("/productos");
  } catch (err) {
    res.status(500).send("Error al eliminar producto");
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
