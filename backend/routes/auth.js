const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const Store = require('../lib/store');
const { generateTokens, verifyToken } = require('../lib/jwt');
const { generateOtp, verifyOtp } = require('../lib/otp');
const { userId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');

const users = new Store('users.json');
const refreshTokens = new Store('refresh-tokens.json');

const router = Router();

// POST /auth/register
router.post('/register', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email and password are required');
  }
  if (password.length < 8) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Password must be at least 8 characters');
  }

  const existing = users.findBy('email', email);
  if (existing) {
    throw new AppError(400, 'EMAIL_TAKEN', 'Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: userId(),
    email,
    emailVerified: false,
    name: '',
    passwordHash,
    phone: null,
    avatarUrl: null,
    address: null,
  };

  users.insert(user);
  const code = generateOtp('verify', email);

  res.status(201).json({ 
    code,
  });
}));

// POST /auth/verify-email
router.post('/verify-email', asyncHandler((req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email and code are required');
  }

  const user = users.findBy('email', email);
  if (!user) {
    throw new AppError(400, 'NOT_FOUND', 'User not found');
  }

  if (!verifyOtp('verify', email, code)) {
    throw new AppError(400, 'INVALID_OTP', 'Invalid or expired OTP code');
  }

  users.update(user.id, { emailVerified: true });
  res.status(204).end();
}));

// POST /auth/resend-verification
router.post('/resend-verification', asyncHandler((req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email is required');
  }

  const user = users.findBy('email', email);
  if (user && !user.emailVerified) {
    generateOtp('verify', email);
  }

  // Always return 204 for security (don't reveal if email exists)
  res.status(204).end();
}));

// POST /auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email and password are required');
  }

  const user = users.findBy('email', email);
  if (!user) {
    throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  if (!user.emailVerified) {
    throw new AppError(400, 'EMAIL_NOT_VERIFIED', 'Please verify your email first');
  }

  const tokens = generateTokens(user);

  // Store refresh token
  refreshTokens.insert({
    id: tokens.refreshToken,
    userId: user.id,
    createdAt: new Date().toISOString(),
  });

  const { passwordHash, ...publicUser } = user;
  res.json({ tokens, user: publicUser });
}));

// POST /auth/refresh
router.post('/refresh', asyncHandler((req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Refresh token is required');
  }

  // Verify JWT signature
  let decoded;
  try {
    decoded = verifyToken(refreshToken);
  } catch {
    throw new AppError(400, 'INVALID_TOKEN', 'Invalid or expired refresh token');
  }

  // Check if refresh token exists in store
  const stored = refreshTokens.findById(refreshToken);
  if (!stored) {
    throw new AppError(400, 'INVALID_TOKEN', 'Refresh token has been revoked');
  }

  // Remove old refresh token
  refreshTokens.remove(refreshToken);

  // Issue new tokens
  const user = users.findById(decoded.sub);
  if (!user) {
    throw new AppError(400, 'NOT_FOUND', 'User not found');
  }

  const tokens = generateTokens(user);

  // Store new refresh token
  refreshTokens.insert({
    id: tokens.refreshToken,
    userId: user.id,
    createdAt: new Date().toISOString(),
  });

  res.json({ tokens });
}));

// POST /auth/logout
router.post('/logout', requireAuth, asyncHandler((req, res) => {
  // Remove all refresh tokens for this user
  const all = refreshTokens.readAll();
  const filtered = all.filter((t) => t.userId !== req.user.id);
  refreshTokens.writeAll(filtered);

  res.status(204).end();
}));

// POST /auth/forgot-password
router.post('/forgot-password', asyncHandler((req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Email is required');
  }

  const user = users.findBy('email', email);
  if (user) {
    const token = uuidv4();
    users.update(user.id, {
      resetToken: token,
      resetTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    });
    console.log(`[RESET] ${email}: token = ${token}`);
  }

  // Always 204 for security
  res.status(204).end();
}));

// POST /auth/reset-password
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Token and new password are required');
  }
  if (newPassword.length < 8) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Password must be at least 8 characters');
  }

  const all = users.readAll();
  const user = all.find((u) => u.resetToken === token);
  if (!user) {
    throw new AppError(400, 'INVALID_TOKEN', 'Invalid or expired reset token');
  }

  if (new Date(user.resetTokenExpiresAt) < new Date()) {
    throw new AppError(400, 'INVALID_TOKEN', 'Reset token has expired');
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  users.update(user.id, {
    passwordHash,
    resetToken: null,
    resetTokenExpiresAt: null,
  });

  res.status(204).end();
}));

module.exports = router;
