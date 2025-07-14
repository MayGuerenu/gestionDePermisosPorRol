const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const Role = require('../models/role.model');


router.get('/new', (req, res) => {
  const currentUser = req.user;

  if (currentUser) {
    const isAdmin = currentUser.role === 'admin';
    if (!isAdmin) {
      return res.redirect(`/users/${currentUser.userId}`);
    }

    const roles = Role.getAll();
    return res.render('users/new', { roles });
  }

  return res.render('users/new', { roles: [] });
});


router.get('/login', (req, res) => {
  res.render('users/login');
});

const { createSession } = require('../services/session.service');

router.post('/login', (req, res) => {
  const User = require('../models/user.model');
  const { email } = req.body;
  const user = User.getByEmail(email);

  if (!user) {
    return res.status(401).send('Usuario no encontrado');
  }

  const sessionId = createSession(user);
  res.cookie('sessionId', sessionId, { httpOnly: true });
  res.redirect(`/users/${user.id}`);
});

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
