const db = require('../config/db');
const chalk = require('chalk');

function getAll() {
  const permisos = db.prepare('SELECT * FROM permissions').all();
  console.log(chalk.blue(`[DB] ${permisos.length} permisos encontrados`));
  return permisos;
}

function getById(id) {
  return db.prepare('SELECT * FROM permissions WHERE id = ?').get(id);
}

function create({ nombre }) {
  if (!nombre || nombre.length < 3) throw new Error('Nombre del permiso inválido');
  const result = db.prepare('INSERT INTO permissions (nombre) VALUES (?)').run(nombre);
  console.log(chalk.green(`[DB] Permiso creado con ID ${result.lastInsertRowid}`));
  return result;
}

function update(id, { nombre }) {
  if (!nombre || nombre.length < 3) throw new Error('Nombre del permiso inválido');
  const result = db.prepare('UPDATE permissions SET nombre = ? WHERE id = ?').run(nombre, id);
  console.log(chalk.cyan(`[DB] Permiso ID ${id} actualizado (${result.changes} cambio/s)`));
  return result;
}

function remove(id) {
  const result = db.prepare('DELETE FROM permissions WHERE id = ?').run(id);
  console.log(chalk.red(`[DB] Permiso ID ${id} eliminado (${result.changes} cambio/s)`));
  return result;
}

module.exports = { getAll, getById, create, update, remove };
