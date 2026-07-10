const { Router } = require('express');
const Store = require('../lib/store');
const { prdId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAdmin = require('../middleware/admin-auth');

const products = new Store('products.json');

const router = Router();

// All admin product routes require an admin token
router.use(requireAdmin);

function validateTitle(title) {
  if (typeof title !== 'string' || !title.trim()) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Title must be a non-empty string');
  }
  return title.trim();
}

function validateAmount(amount) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Amount must be a non-negative integer (minor units)');
  }
  return amount;
}

function validateCredits(credits) {
  if (!Number.isInteger(credits) || credits < 0) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Credits must be a non-negative integer');
  }
  return credits;
}

// GET /admin/products
router.get('/', asyncHandler((req, res) => {
  res.json(products.readAll());
}));

// POST /admin/products
router.post('/', asyncHandler((req, res) => {
  const { title, description, amount, currency, credits } = req.body;

  const now = new Date().toISOString();
  const product = {
    id: prdId(),
    title: validateTitle(title),
    description: description ?? null,
    amount: validateAmount(amount),
    currency: currency || 'USD',
    credits: credits === undefined ? 0 : validateCredits(credits),
    createdAt: now,
    updatedAt: now,
  };

  products.insert(product);
  res.status(201).json(product);
}));

// PATCH /admin/products/:productId
router.patch('/:productId', asyncHandler((req, res) => {
  const existing = products.findById(req.params.productId);
  if (!existing) throw new AppError(404, 'NOT_FOUND', 'Product not found');

  const { title, description, amount, currency, credits } = req.body;
  const updates = { updatedAt: new Date().toISOString() };

  if (title !== undefined) updates.title = validateTitle(title);
  if (description !== undefined) updates.description = description;
  if (amount !== undefined) updates.amount = validateAmount(amount);
  if (currency !== undefined) updates.currency = currency || 'USD';
  if (credits !== undefined) updates.credits = validateCredits(credits);

  const updated = products.update(req.params.productId, updates);
  res.json(updated);
}));

// DELETE /admin/products/:productId
// No cascade needed: checkouts snapshot amount/currency/credits at creation,
// and GET /checkout/:id falls back to productId when the product is gone.
router.delete('/:productId', asyncHandler((req, res) => {
  const existing = products.findById(req.params.productId);
  if (!existing) throw new AppError(404, 'NOT_FOUND', 'Product not found');

  products.remove(req.params.productId);
  res.status(204).end();
}));

module.exports = router;
