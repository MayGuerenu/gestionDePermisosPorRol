const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const Role = require('../models/role.model');


router.get('/new', (req, res) => {
  const roles = Role.getAll();
  res.render('users/new', { roles });
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', (req, res) => {
  const User = require('../models/user.model');
  const { email } = req.body;
  const user = User.getByEmail(email);
  if (user) {
    res.redirect(`/users/${user.id}`);
  } else {
    res.status(401).send('Usuario no encontrado');
  }
});

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
