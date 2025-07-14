const db = require("../config/db");

function getAll(nombreFiltro) {
  const stmt = nombreFiltro
    ? db.prepare("SELECT * FROM productos WHERE nombre LIKE ?")
    : db.prepare("SELECT * FROM productos");
  return nombreFiltro ? stmt.all(`%${nombreFiltro}%`) : stmt.all();
}

function getById(id) {
  return db.prepare("SELECT * FROM productos WHERE id = ?").get(id);
}

function create(nombre, descripcion, precio) {
  return db.prepare(
    "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)"
  ).run(nombre, descripcion, precio);
}

function update(id, nombre, descripcion, precio) {
  return db.prepare(
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?"
  ).run(nombre, descripcion, precio, id);
}

function deleteProduct(id) {
  return db.prepare("DELETE FROM productos WHERE id = ?").run(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteProduct
};
