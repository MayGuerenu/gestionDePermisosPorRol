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
  const currentUser = req.user;

  if (currentUser) {
    return res.redirect(`/users/${currentUser.userId}`);
  }

  res.render('users/login');
});


const bcrypt = require('bcryptjs');
const { createSession } = require('../services/session.service');
const User = require('../models/user.model');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = User.getByEmail(email);
  if (!user) {
    return res.status(401).send('Usuario no encontrado');
  }

  const validPassword = bcrypt.compareSync(password, user.password_hash);
  if (!validPassword) {
    return res.status(401).send('Contraseña incorrecta');
  }

  const sessionId = createSession(user);
  res.cookie('sessionId', sessionId, { httpOnly: true });
  res.redirect(`/users/${user.id}`);
});

const { deleteSession } = require('../services/session.service');

router.post('/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    deleteSession(sessionId);
    res.clearCookie('sessionId');
  }
  res.redirect('/users/login');
});

router.get('/:id', (req, res) => {
  const currentUser = req.user;

  if (!currentUser) {
    return res.redirect('/users/login');
  }

  const requestedId = parseInt(req.params.id);

  if (currentUser.userId !== requestedId) {
    return res.redirect('/users/login');
  }

  return controller.getUserById(req, res);
});


router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);

router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
