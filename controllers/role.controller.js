const Role = require('../models/role.model');
const Permission = require('../models/permissions.model');

function getAllRoles(req, res) {
  const roles = Role.getAll();
  res.render('roles/index', { roles });
}

function getRoleById(req, res) {
  const role = Role.getById(req.params.id);
  if (!role) return res.status(404).send('Rol no encontrado');

  const permissions = Role.getPermissions(req.params.id);
  res.render('roles/detail', { role, permissions });
}

function renderNewRoleForm(req, res) {
  res.render('roles/new');
}

function createRole(req, res) {
  try {
    Role.create({ name: req.body.name });
    res.redirect('/roles');
  } catch (err) {
    res.status(400).send('Error al crear rol: ' + err.message);
  }
}

function renderEditRoleForm(req, res) {
  const role = Role.getById(req.params.id);
  if (!role) return res.status(404).send('Rol no encontrado');

  const allPermissions = Permission.getAll();
  const assignedPermissions = Role.getPermissions(req.params.id).map(p => p.id);

  res.render('roles/edit', {
    role,
    allPermissions,
    assignedPermissions
  });
}

function updateRole(req, res) {
  const { name, permissions } = req.body;
  const roleId = req.params.id;

  try {
    Role.update(roleId, { name });

    const perms = Array.isArray(permissions) ? permissions.map(Number) :
                 permissions ? [Number(permissions)] : [];

    Role.setPermissions(roleId, perms);

    res.redirect('/roles');
  } catch (err) {
    res.status(400).send('Error al actualizar rol: ' + err.message);
  }
}

function deleteRole(req, res) {
  try {
    Role.remove(req.params.id);
    res.redirect('/roles');
  } catch (err) {
    res.status(500).send('Error al eliminar rol');
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  renderNewRoleForm,
  createRole,
  renderEditRoleForm,
  updateRole,
  deleteRole
};
