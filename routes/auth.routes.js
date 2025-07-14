const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secreto123'; // Usar variable .env si está disponible

// Registro (API)
router.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  try {
    User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('[REGISTER ERROR]', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Login (API)
router.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = User.getByEmail(email);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const valid = bcrypt.compareSync(password, user.password_hash || '');
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role_id: user.role_id },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
