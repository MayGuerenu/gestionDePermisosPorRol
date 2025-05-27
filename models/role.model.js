const db = require('../config/db');
const chalk = require('chalk');

function getAll() {
  const roles = db.prepare('SELECT * FROM roles').all();
  console.log(chalk.blue(`[DB] ${roles.length} roles encontrados`));
  return roles;
}

function getById(id) {
  const role = db.prepare('SELECT * FROM roles WHERE id = ?').get(id);
  console.log(role
    ? chalk.blue(`[DB] Rol ID ${id} encontrado`)
    : chalk.yellow(`[DB] Rol ID ${id} no encontrado`));
  return role;
}

function create({ name }) {
  if (!name || name.length < 3) throw new Error('Nombre del rol inválido');
  const result = db.prepare('INSERT INTO roles (name) VALUES (?)').run(name);
  console.log(chalk.green(`[DB] Rol creado con ID ${result.lastInsertRowid}`));
  return result;
}

function update(id, { name }) {
  if (!name || name.length < 3) throw new Error('Nombre del rol inválido');
  const result = db.prepare('UPDATE roles SET name = ? WHERE id = ?').run(name, id);
  console.log(chalk.cyan(`[DB] Rol ID ${id} actualizado (${result.changes} cambio/s)`));
  return result;
}

function remove(id) {
  const result = db.prepare('DELETE FROM roles WHERE id = ?').run(id);
  console.log(chalk.red(`[DB] Rol ID ${id} eliminado (${result.changes} cambio/s)`));
  return result;
}

function getPermissions(roleId) {
  return db.prepare(`
    SELECT permissions.id, permissions.nombre FROM permissions
    INNER JOIN role_permission ON permissions.id = role_permission.permission_id
    WHERE role_permission.role_id = ?
  `).all(roleId);
}

function setPermissions(roleId, permissionIds) {
  const deleteStmt = db.prepare(`DELETE FROM role_permission WHERE role_id = ?`);
  deleteStmt.run(roleId);

  const insertStmt = db.prepare(`INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)`);
  const insertMany = db.transaction((ids) => {
    for (const pid of ids) insertStmt.run(roleId, pid);
  });

  insertMany(permissionIds);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getPermissions,
  setPermissions
};
