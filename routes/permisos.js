const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisosController');

router.get('/', permisosController.listarPermisos);
router.get('/nuevo', permisosController.formNuevoPermiso);
router.post('/nuevo', permisosController.crearPermiso);
router.get('/:id/editar', permisosController.formEditarPermiso);
router.post('/:id/editar', permisosController.actualizarPermiso);
router.post('/:id/eliminar', permisosController.eliminarPermiso);

module.exports = router;
