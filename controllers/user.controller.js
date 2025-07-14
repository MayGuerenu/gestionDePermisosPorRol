const User = require('../models/user.model');
const Role = require('../models/role.model');


function getAllUsers(req, res) {
  try {
    const { limit, offset, search, role } = req.query;
    const users = User.getAll({ limit, offset, search, role });
    res.render('users/index', { users });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener usuarios');
  }
}

function getUserById(req, res) {
  try {
    const user = User.getById(req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');

    let permissions = [];
    if (user.role_id) {
      permissions = Role.getPermissions(user.role_id);
    }

    res.render('users/detail', { 
      user: {
        ...user,
        role_name: user.role_name || 'Sin rol',
      },
      permissions
    });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error en la búsqueda');
  }
}

function createUser(req, res) {
  try {
    const data = req.body;

    const roleId = parseInt(data.role_id);
    data.role_id = roleId === 1 ? 1 : 2;

    User.create(data);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al crear: ' + err.message);
  }
}



function updateUser(req, res) {
  try {
    User.update(req.params.id, req.body);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(400).send('Error al actualizar: ' + err.message);
  }
}

function deleteUser(req, res) {
  try {
    User.softDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al eliminar');
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };