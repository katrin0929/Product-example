const { Router } = require('express');
const Store = require('../lib/store');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAdmin = require('../middleware/admin-auth');
const { deleteUserCascade, revokeRefreshTokens } = require('../lib/user-cascade');

const users = new Store('users.json');
const payments = new Store('payments.json');
const projects = new Store('projects.json');
const documents = new Store('documents.json');

const router = Router();

router.use(requireAdmin);

function toAdminView(user) {
  const { passwordHash, resetToken, resetTokenExpiresAt, ...pub } = user;
  return { ...pub, blocked: Boolean(user.blocked) };
}

function loadUser(userId) {
  const user = users.findById(userId);
  if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found');
  return user;
}

// GET /admin/users
router.get('/', asyncHandler((req, res) => {
  res.json(users.readAll().map(toAdminView));
}));

// GET /admin/users/:userId — details + billing/activity summary
router.get('/:userId', asyncHandler((req, res) => {
  const user = loadUser(req.params.userId);
  const paid = payments.filterBy('userId', user.id).filter((p) => p.status === 'paid');

  res.json({
    user: toAdminView(user),
    summary: {
      paymentsCount: paid.length,
      totalSpent: paid.reduce((sum, p) => sum + p.amount, 0),
      availableCredits: paid.reduce((sum, p) => sum + (p.credits || 0), 0),
      projectsCount: projects.readAll().filter((p) => (p.team || []).includes(user.id)).length,
      documentsCount: documents.filterBy('userId', user.id).length,
      currency: 'USD',
    },
  });
}));

// PATCH /admin/users/:userId — name/phone only
router.patch('/:userId', asyncHandler((req, res) => {
  loadUser(req.params.userId);

  const { name, phone } = req.body;
  const updates = {};

  if (name !== undefined) {
    if (typeof name !== 'string') {
      throw new AppError(400, 'VALIDATION_ERROR', 'Name must be a string');
    }
    updates.name = name.trim();
  }
  if (phone !== undefined) {
    if (phone !== null && typeof phone !== 'string') {
      throw new AppError(400, 'VALIDATION_ERROR', 'Phone must be a string or null');
    }
    updates.phone = phone;
  }

  res.json(toAdminView(users.update(req.params.userId, updates)));
}));

// POST /admin/users/:userId/block — idempotent; also kills refresh tokens
router.post('/:userId/block', asyncHandler((req, res) => {
  const user = loadUser(req.params.userId);
  users.update(user.id, { blocked: true });
  revokeRefreshTokens(user.id);
  res.json(toAdminView(users.findById(user.id)));
}));

// POST /admin/users/:userId/unblock — idempotent
router.post('/:userId/unblock', asyncHandler((req, res) => {
  const user = loadUser(req.params.userId);
  users.update(user.id, { blocked: false });
  res.json(toAdminView(users.findById(user.id)));
}));

// DELETE /admin/users/:userId — full cascade
router.delete('/:userId', asyncHandler((req, res) => {
  loadUser(req.params.userId);
  deleteUserCascade(req.params.userId);
  res.status(204).end();
}));

module.exports = router;
