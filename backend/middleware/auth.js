const Store = require('../lib/store');
const { verifyToken } = require('../lib/jwt');
const { AppError } = require('./error-handler');

const users = new Store('users.json');

function requireAuth(req, res, next) {
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

  // Только access-токен: refresh-токен ('refresh') и админ-токен ('admin')
  // не должны проходить как Bearer на пользовательских роутах
  if (decoded.type !== 'access') {
    return next(new AppError(401, 'UNAUTHORIZED', 'Invalid token type'));
  }

  // Store lookup: удалённый или заблокированный пользователь теряет доступ сразу,
  // не дожидаясь истечения токена
  const user = users.findById(decoded.sub);
  if (!user) {
    return next(new AppError(401, 'UNAUTHORIZED', 'User not found'));
  }
  if (user.blocked) {
    return next(new AppError(403, 'USER_BLOCKED', 'Account is blocked'));
  }

  req.user = { id: user.id, email: user.email };
  next();
}

module.exports = requireAuth;
