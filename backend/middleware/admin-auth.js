const Store = require('../lib/store');
const { verifyToken } = require('../lib/jwt');
const { AppError } = require('./error-handler');

const adminUsers = new Store('admin-users.json');

function requireAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError(401, 'UNAUTHORIZED', 'Missing or invalid authorization header'));
  }

  let decoded;
  try {
    decoded = verifyToken(header.slice(7));
  } catch {
    return next(new AppError(401, 'UNAUTHORIZED', 'Invalid or expired token'));
  }

  if (decoded.type !== 'admin') {
    return next(new AppError(403, 'FORBIDDEN', 'Admin token required'));
  }

  const admin = adminUsers.findById(decoded.sub);
  if (!admin) {
    return next(new AppError(401, 'UNAUTHORIZED', 'Admin account not found'));
  }

  req.admin = { id: admin.id, email: admin.email };
  next();
}

module.exports = requireAdmin;
