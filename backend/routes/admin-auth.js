const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Store = require('../lib/store');
const { signAccessToken } = require('../lib/jwt');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAdmin = require('../middleware/admin-auth');

const adminUsers = new Store('admin-users.json');

const router = Router();

// POST /admin/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email and password are required');
  }

  const admin = adminUsers.findBy('email', email);
  if (!admin) {
    throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const accessToken = signAccessToken({ sub: admin.id, email: admin.email, type: 'admin' });
  const decoded = jwt.decode(accessToken);
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  res.json({
    accessToken,
    expiresIn,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
}));

// GET /admin/auth/me
router.get('/me', requireAdmin, asyncHandler((req, res) => {
  const admin = adminUsers.findById(req.admin.id);
  res.json({ id: admin.id, email: admin.email, name: admin.name });
}));

module.exports = router;
