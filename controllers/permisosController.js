const db = require('../config/db');

// Mostrar lista de permisos
exports.listarPermisos = (req, res) => {
  db.all('SELECT * FROM permisos', [], (err, permisos) => {
    if (err) return res.send('Error al obtener permisos');
    res.render('permisos/index', { permisos });
  });
};

// Mostrar formulario para nuevo permiso
exports.formNuevoPermiso = (req, res) => {
  res.render('permisos/nuevo');
};

// Crear nuevo permiso
exports.crearPermiso = (req, res) => {
  const { nombre } = req.body;
  db.run('INSERT INTO permisos (nombre) VALUES (?)', [nombre], function (err) {
    if (err) {
      return res.render('permisos/nuevo', { error: 'Ese permiso ya existe', nombre });
    }
    res.redirect('/permisos');
  });
};

// Formulario de edición
exports.formEditarPermiso = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM permisos WHERE id = ?', [id], (err, permiso) => {
    if (err || !permiso) return res.send('Permiso no encontrado');
    res.render('permisos/editar', { permiso });
  });
};

// Actualizar permiso
exports.actualizarPermiso = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  db.run('UPDATE permisos SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
    if (err) return res.send('Error al actualizar permiso');
    res.redirect('/permisos');
  });
};

// Eliminar permiso
exports.eliminarPermiso = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM permisos WHERE id = ?', [id], (err) => {
    if (err) return res.send('Error al eliminar permiso');
    res.redirect('/permisos');
  });
};
