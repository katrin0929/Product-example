const { Router } = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const Store = require('../lib/store');
const { generateOtp, verifyOtp } = require('../lib/otp');
const { expId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');
const config = require('../config');

const users = new Store('users.json');
const exports_ = new Store('exports.json');
const documents = new Store('documents.json');
const notifications = new Store('notifications.json');
const refreshTokens = new Store('refresh-tokens.json');

// Avatar upload config
const avatarStorage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads', 'avatars'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`);
  },
});
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: config.UPLOAD_MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new AppError(400, 'INVALID_FILE', 'Only image files are allowed'));
    }
  },
});

const router = Router();

// All user routes require auth
router.use(requireAuth);

function toPublic(user) {
  const { passwordHash, resetToken, resetTokenExpiresAt, pendingEmail, ...pub } = user;
  return pub;
}

// GET /me
router.get('/', asyncHandler((req, res) => {
  const user = users.findById(req.user.id);
  if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found');
  res.json(toPublic(user));
}));

// PATCH /me
router.patch('/', asyncHandler((req, res) => {
  const { name, phone, address } = req.body;
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (phone !== undefined) updates.phone = phone;
  if (address !== undefined) updates.address = address;

  const user = users.update(req.user.id, updates);
  if (!user) throw new AppError(404, 'NOT_FOUND', 'User not found');
  res.json(toPublic(user));
}));

// DELETE /me
router.delete('/', asyncHandler((req, res) => {
  users.remove(req.user.id);

  // Cleanup related data
  const allDocs = documents.readAll().filter((d) => d.userId !== req.user.id);
  documents.writeAll(allDocs);

  const allNtf = notifications.readAll().filter((n) => n.userId !== req.user.id);
  notifications.writeAll(allNtf);

  const allRt = refreshTokens.readAll().filter((t) => t.userId !== req.user.id);
  refreshTokens.writeAll(allRt);

  res.status(204).end();
}));

// POST /me/avatar
router.post('/avatar', uploadAvatar.single('file'), asyncHandler((req, res) => {
  if (!req.file) throw new AppError(400, 'VALIDATION_ERROR', 'File is required');

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  users.update(req.user.id, { avatarUrl });

  res.json({ avatarUrl });
}));

// POST /me/change-email
router.post('/change-email', asyncHandler((req, res) => {
  const { newEmail } = req.body;
  if (!newEmail) throw new AppError(400, 'VALIDATION_ERROR', 'New email is required');

  const existing = users.findBy('email', newEmail);
  if (existing) throw new AppError(400, 'EMAIL_TAKEN', 'Email is already in use');

  users.update(req.user.id, { pendingEmail: newEmail });
  generateOtp('change-email', newEmail);

  res.status(204).end();
}));

// POST /me/confirm-email-change
router.post('/confirm-email-change', asyncHandler((req, res) => {
  const { code } = req.body;
  if (!code) throw new AppError(400, 'VALIDATION_ERROR', 'Code is required');

  const user = users.findById(req.user.id);
  if (!user || !user.pendingEmail) {
    throw new AppError(400, 'NO_PENDING_CHANGE', 'No pending email change');
  }

  if (!verifyOtp('change-email', user.pendingEmail, code)) {
    throw new AppError(400, 'INVALID_OTP', 'Invalid or expired OTP code');
  }

  users.update(req.user.id, {
    email: user.pendingEmail,
    pendingEmail: null,
    emailVerified: true,
  });

  res.status(204).end();
}));

// POST /me/change-password
router.post('/change-password', asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Current and new passwords are required');
  }
  if (newPassword.length < 8) {
    throw new AppError(400, 'VALIDATION_ERROR', 'New password must be at least 8 characters');
  }

  const user = users.findById(req.user.id);
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    throw new AppError(400, 'INVALID_PASSWORD', 'Current password is incorrect');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  users.update(req.user.id, { passwordHash });

  res.status(204).end();
}));

// POST /me/export
router.post('/export', asyncHandler((req, res) => {
  const id = expId();
  const exportRecord = {
    id,
    exportId: id,
    userId: req.user.id,
    status: 'pending',
    downloadUrl: null,
  };

  exports_.insert(exportRecord);

  // Simulate async processing
  setTimeout(() => {
    exports_.update(id, {
      status: 'ready',
      downloadUrl: `/uploads/exports/${id}.json`,
    });
    console.log(`[EXPORT] ${id} ready for user ${req.user.id}`);
  }, 3000);

  res.status(202).json({ exportId: id });
}));

// GET /me/export/:exportId
router.get('/export/:exportId', asyncHandler((req, res) => {
  const record = exports_.findById(req.params.exportId);
  if (!record || record.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Export not found');
  }

  res.json({
    exportId: record.exportId,
    status: record.status,
    downloadUrl: record.downloadUrl,
  });
}));

module.exports = router;
