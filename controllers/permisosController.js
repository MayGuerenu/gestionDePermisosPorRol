const db = require('../config/db');

// Mostrar lista de permisos
exports.listarPermisos = (req, res) => {
  try {
    const permisos = db.prepare('SELECT * FROM permissions').all();
    console.log('[DB] Listado obtenido:', permisos);
    res.render('permisos/index', { permisos: permisos || [] });
  } catch (err) {
    console.error('Error al obtener permisos:', err);
    res.status(500).send('Error al obtener permisos: ' + err.message);
  }
};

// Mostrar formulario para nuevo permiso
exports.formNuevoPermiso = (req, res) => {
  res.render('permisos/nuevo', { nombre: '', error: null });
};

// Crear nuevo permiso
exports.crearPermiso = (req, res) => {
  const { nombre } = req.body;
  try {
    db.prepare('INSERT INTO permissions (nombre) VALUES (?)').run(nombre);
    res.redirect('/permisos');
  } catch (err) {
    res.render('permisos/nuevo', { error: 'Ese permiso ya existe', nombre });
  }
};


// Formulario de edición
exports.formEditarPermiso = (req, res) => {
  const id = req.params.id;
  try {
    const permiso = db.prepare('SELECT * FROM permissions WHERE id = ?').get(id);
    if (!permiso) return res.send('Permiso no encontrado');
    res.render('permisos/editar', { permiso });
  } catch (err) {
    res.status(500).send('Error al obtener permiso: ' + err.message);
  }
};

// Actualizar permiso
exports.actualizarPermiso = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    db.prepare('UPDATE permissions SET nombre = ? WHERE id = ?').run(nombre, id);
    res.redirect('/permisos');
  } catch (err) {
    res.status(500).send('Error al actualizar permiso: ' + err.message);
  }
};
// Eliminar permiso
exports.eliminarPermiso = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('DELETE FROM permissions WHERE id = ?').run(id);
    res.redirect('/permisos');
  } catch (err) {
    res.send('Error al eliminar permiso');
  }
};
