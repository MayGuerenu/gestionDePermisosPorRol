const db = require('../config/db');
const chalk = require('chalk');


function getByRoleId(roleId) {
  const rows = db.prepare(`
    SELECT p.* FROM role_permission rp
    JOIN permissions p ON rp.permission_id = p.id
    WHERE rp.role_id = ?
  `).all(roleId);
  console.log(chalk.blue(`[DB] ${rows.length} permisos obtenidos para rol ${roleId}`));
  return rows;
}

function setPermissionsForRole(roleId, permissionIds) {
  const deleteOld = db.prepare('DELETE FROM role_permission WHERE role_id = ?').run(roleId);
  const insert = db.prepare('INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)');
  const insertMany = db.transaction((ids) => {
    for (const pid of ids) {
      insert.run(roleId, pid);
    }
  });
  insertMany(permissionIds);
  console.log(chalk.green(`[DB] Asignados ${permissionIds.length} permisos al rol ${roleId}`));
}

module.exports = { getByRoleId, setPermissionsForRole };
