const { Router } = require('express');
const Store = require('../lib/store');
const { pmId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');

const paymentMethods = new Store('payment-methods.json');

const router = Router();
router.use(requireAuth);

function sanitize(pm) {
  const { userId, ...publicPm } = pm;
  return publicPm;
}

function detectBrand(digits) {
  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'Amex';
  if (/^6/.test(digits)) return 'Discover';
  return 'Card';
}

function validateExpiry(expMonth, expYear) {
  if (!Number.isInteger(expMonth) || expMonth < 1 || expMonth > 12) {
    throw new AppError(400, 'VALIDATION_ERROR', 'expMonth must be an integer between 1 and 12');
  }
  if (!Number.isInteger(expYear)) {
    throw new AppError(400, 'VALIDATION_ERROR', 'expYear must be an integer');
  }
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Card expiration date is in the past');
  }
}

function unsetOtherDefaults(userId, exceptId) {
  const now = new Date().toISOString();
  paymentMethods
    .filterBy('userId', userId)
    .filter((pm) => pm.isDefault && pm.id !== exceptId)
    .forEach((pm) => paymentMethods.update(pm.id, { isDefault: false, updatedAt: now }));
}

// GET /payment-methods — list current user's payment methods
router.get('/', asyncHandler((req, res) => {
  const methods = paymentMethods
    .filterBy('userId', req.user.id)
    .sort((a, b) => {
      if (a.isDefault !== b.isDefault) return a.isDefault ? -1 : 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .map(sanitize);

  res.json(methods);
}));

// POST /payment-methods — add payment method
router.post('/', asyncHandler((req, res) => {
  const { cardNumber, cardholderName, expMonth, expYear, isDefault } = req.body;

  if (!cardNumber) {
    throw new AppError(400, 'VALIDATION_ERROR', 'cardNumber is required');
  }
  const digits = String(cardNumber).replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(digits)) {
    throw new AppError(400, 'VALIDATION_ERROR', 'cardNumber must contain 13-19 digits');
  }
  validateExpiry(expMonth, expYear);

  const existing = paymentMethods.filterBy('userId', req.user.id);
  const makeDefault = isDefault === true || existing.length === 0;

  const now = new Date().toISOString();
  const pm = {
    id: pmId(),
    userId: req.user.id,
    brand: detectBrand(digits),
    last4: digits.slice(-4),
    expMonth,
    expYear,
    cardholderName: cardholderName || null,
    isDefault: makeDefault,
    createdAt: now,
    updatedAt: now,
  };

  paymentMethods.insert(pm);
  if (makeDefault) {
    unsetOtherDefaults(req.user.id, pm.id);
  }

  res.status(201).json(sanitize(pm));
}));

// PATCH /payment-methods/:id — update payment method
router.patch('/:id', asyncHandler((req, res) => {
  const pm = paymentMethods.findById(req.params.id);
  if (!pm) {
    throw new AppError(404, 'NOT_FOUND', 'Payment method not found');
  }
  if (pm.userId !== req.user.id) {
    throw new AppError(403, 'FORBIDDEN', 'This payment method belongs to another user');
  }

  const { cardholderName, expMonth, expYear, isDefault } = req.body;
  const updates = { updatedAt: new Date().toISOString() };

  if (cardholderName !== undefined) updates.cardholderName = cardholderName || null;

  if (expMonth !== undefined || expYear !== undefined) {
    validateExpiry(expMonth !== undefined ? expMonth : pm.expMonth, expYear !== undefined ? expYear : pm.expYear);
    if (expMonth !== undefined) updates.expMonth = expMonth;
    if (expYear !== undefined) updates.expYear = expYear;
  }

  if (isDefault !== undefined) {
    if (typeof isDefault !== 'boolean') {
      throw new AppError(400, 'VALIDATION_ERROR', 'isDefault must be a boolean');
    }
    updates.isDefault = isDefault;
  }

  const updated = paymentMethods.update(req.params.id, updates);
  if (updates.isDefault === true) {
    unsetOtherDefaults(req.user.id, updated.id);
  }

  res.json(sanitize(updated));
}));

module.exports = router;
