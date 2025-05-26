// controllers/role.controller.js
const Role = require('../models/role.model');

function getAllRoles(req, res) {
  try {
    const roles = Role.getAll();
    res.render('roles/index', { roles });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener roles');
  }
}

function getRoleById(req, res) {
    try {
      const role = Role.getById(req.params.id);
      if (!role) return res.status(404).send('Rol no encontrado');
      res.render('roles/detail', { role });
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al buscar el rol');
    }
  }
  
  function renderNewRoleForm(req, res) {
    res.render('roles/new');
  }
  
  function renderEditRoleForm(req, res) {
    try {
      const role = Role.getById(req.params.id);
      if (!role) return res.status(404).send('Rol no encontrado');
      res.render('roles/edit', { role });
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al cargar formulario');
    }
  }
  
  function createRole(req, res) {
    try {
      Role.create(req.body);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(400).send('Error al crear: ' + err.message);
    }
  }
  
  function updateRole(req, res) {
    try {
      Role.update(req.params.id, req.body);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(400).send('Error al actualizar: ' + err.message);
    }
  }
  
  function deleteRole(req, res) {
    try {
      Role.remove(req.params.id);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al eliminar');
    }
  }
  
  module.exports = {
    getAllRoles,
    getRoleById,
    renderNewRoleForm,
    renderEditRoleForm,
    createRole,
    updateRole,
    deleteRole
  };