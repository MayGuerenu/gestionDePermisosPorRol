const sessions = {};

function createSession(user) {
  const sessionId = generateRandomId();
  sessions[sessionId] = {
    userId: user.id,
    email: user.email,
    role: user.role_name,
    createdAt: Date.now()
  };
  return sessionId;
}

function getSession(sessionId) {
  return sessions[sessionId] || null;
}

function generateRandomId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function deleteSession(sessionId) {
  delete sessions[sessionId];
}


module.exports = {
  createSession,
  getSession,
  deleteSession
};
