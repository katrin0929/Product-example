const { verifyToken } = require('../lib/jwt');
const { AppError } = require('./error-handler');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError(401, 'UNAUTHORIZED', 'Missing or invalid authorization header'));
  }

  try {
    const decoded = verifyToken(header.slice(7));
    req.user = { id: decoded.sub, email: decoded.email };
    next();
  } catch {
    next(new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
  }
}

module.exports = requireAuth;
