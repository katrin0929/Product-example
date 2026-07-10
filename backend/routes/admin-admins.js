const { Router } = require('express');
const bcrypt = require('bcryptjs');
const Store = require('../lib/store');
const { admId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAdmin = require('../middleware/admin-auth');

const adminUsers = new Store('admin-users.json');

const router = Router();

router.use(requireAdmin);

// GET /admin/admins
router.get('/', asyncHandler((req, res) => {
  res.json(adminUsers.readAll().map(({ passwordHash, ...admin }) => admin));
}));

// POST /admin/admins
router.post('/', asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email and password are required');
  }
  if (password.length < 8) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Password must be at least 8 characters');
  }
  if (adminUsers.findBy('email', email)) {
    throw new AppError(400, 'EMAIL_TAKEN', 'Admin with this email already exists');
  }

  const admin = {
    id: admId(),
    email,
    name: (name || '').trim() || 'Admin',
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };

  adminUsers.insert(admin);

  const { passwordHash, ...pub } = admin;
  res.status(201).json(pub);
}));

// DELETE /admin/admins/:adminId — self-delete is forbidden, so ≥1 admin always remains
router.delete('/:adminId', asyncHandler((req, res) => {
  if (req.params.adminId === req.admin.id) {
    throw new AppError(400, 'CANNOT_DELETE_SELF', 'You cannot delete your own admin account');
  }
  if (!adminUsers.findById(req.params.adminId)) {
    throw new AppError(404, 'NOT_FOUND', 'Admin not found');
  }

  adminUsers.remove(req.params.adminId);
  res.status(204).end();
}));

module.exports = router;
