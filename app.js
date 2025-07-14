const express = require('express');
const path = require('path');
const morgan = require('morgan');
const createError = require('http-errors');

const app = express();

const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middlewares/session.middleware');
const logMiddleware = require('./middlewares/log.middleware');

app.use(cookieParser());
app.use(sessionMiddleware);
app.use(logMiddleware);

const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const permisosRoutes = require('./routes/permisos');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/productRoutes');


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
app.use('/permisos', permisosRoutes);
app.use('/productos', productRoutes);


// Configuracion de redireccion (por defecto)
app.get('/', (req, res) => {
  res.redirect('/productos');
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

module.exports = app;
