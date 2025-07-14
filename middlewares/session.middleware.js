const { getSession } = require('../services/session.service');

function sessionMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) return next();

  const session = getSession(sessionId);
  if (session) {
    req.user = session;
  }
  next();
}

module.exports = sessionMiddleware;
