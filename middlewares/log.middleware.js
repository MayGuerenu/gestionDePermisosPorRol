const db = require('../config/db');

function logMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const endpoint = req.originalUrl;
    const metodo = req.method;
    const estado = res.statusCode;
    const mensaje = `${metodo} ${endpoint} - ${estado}`;
    const user_id = req.user?.userId || null;

    db.prepare(`
      INSERT INTO logs (user_id, endpoint, metodo, estado, mensaje)
      VALUES (?, ?, ?, ?, ?)
    `).run(user_id, endpoint, metodo, estado, mensaje);
  });

  next();
}

module.exports = logMiddleware;
