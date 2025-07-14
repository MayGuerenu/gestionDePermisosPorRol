const express = require('express');
const path = require('path');
const morgan = require('morgan');
const createError = require('http-errors');

const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const permisosRoutes = require('./routes/permisos');
const authRoutes = require('./routes/auth.routes');
const app = express();


app.use(authRoutes);

// Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuracion de entorno 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuracion de rutas
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permisos', permisosRoutes);  // Aquí va después de crear app

// Configuracion de redireccion (por defecto)
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Middleware de error 404
app.use((req, res, next) => {
  next(createError(404, 'Ruta no encontrada'));
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('general_error', { 
    message: err.message, 
    error: app.get('env') === 'development' ? err : {} 
  });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const sessionMiddleware = require('./middlewares/session.middleware');
app.use(sessionMiddleware);


module.exports = app;
