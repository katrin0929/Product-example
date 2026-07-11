const { Router } = require('express');
const Store = require('../lib/store');
const { chkId, payId, invId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');
const { notifyUser } = require('../lib/notify');
const config = require('../config');

const productsStore = new Store('products.json');
const checkoutsStore = new Store('checkouts.json');
const paymentsStore = new Store('payments.json');
const invoicesStore = new Store('invoices.json');
const countersStore = new Store('counters.json');

// Hardcoded promo codes: code -> { type, value }
const PROMO_CODES = {
  SAVE10: { type: 'percent', value: 10 },
  HALF: { type: 'percent', value: 50 },
  FREE5: { type: 'fixed', value: 500 },
};


// --- Products router ---
const products = Router();

products.get('/', asyncHandler((req, res) => {
  res.json(productsStore.readAll());
}));

// --- Promo router ---
const promo = Router();

promo.post('/validate', asyncHandler((req, res) => {
  const { code, productId } = req.body;
  if (!code || !productId) {
    throw new AppError(400, 'VALIDATION_ERROR', 'Code and productId are required');
  }

  const product = productsStore.findById(productId);
  if (!product) {
    throw new AppError(400, 'PRODUCT_NOT_FOUND', 'Product not found');
  }

  const promoEntry = PROMO_CODES[code.toUpperCase()];
  if (!promoEntry) {
    return res.json({ valid: false, discountAmount: null, message: 'Invalid promo code' });
  }

  let discountAmount;
  if (promoEntry.type === 'percent') {
    discountAmount = Math.round(product.amount * (promoEntry.value / 100));
  } else {
    discountAmount = promoEntry.value;
  }

  res.json({
    valid: true,
    discountAmount,
    message: `Discount of ${promoEntry.value}${promoEntry.type === 'percent' ? '%' : ' cents'} applied`,
  });
}));

// --- Checkout router ---
const checkout = Router();

const paymentUrlFor = (checkoutId) => `${config.FRONTEND_URL}/pay/${checkoutId}`;

function loadCheckout(checkoutId) {
  const chk = checkoutsStore.findById(checkoutId);
  if (!chk) throw new AppError(404, 'NOT_FOUND', 'Checkout not found');
  return chk;
}

function notifyOwner(chk, title, body) {
  notifyUser(chk.userId, title, body);
}

// Монотонный счётчик в counters.json: переживает и рестарты, и каскадное удаление
// инвойсов (которое иначе позволило бы переиспользовать номер удалённого юзера).
// max с существующими инвойсами — миграция для данных без записи счётчика.
function nextInvoiceNumber() {
  const year = new Date().getFullYear();
  const counterId = `invoice-${year}`;
  const re = new RegExp(`^INV-${year}-(\\d+)$`);

  const maxFromInvoices = invoicesStore.readAll().reduce((acc, inv) => {
    const m = re.exec(inv.number || '');
    return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
  }, 0);

  const counter = countersStore.findById(counterId);
  const next = Math.max(counter ? counter.value : 0, maxFromInvoices) + 1;

  if (counter) countersStore.update(counterId, { value: next });
  else countersStore.insert({ id: counterId, value: next });

  return `INV-${year}-${String(next).padStart(4, '0')}`;
}

checkout.post('/', requireAuth, asyncHandler((req, res) => {
  const { productId, promoCode } = req.body;
  if (!productId) throw new AppError(400, 'VALIDATION_ERROR', 'productId is required');

  const product = productsStore.findById(productId);
  if (!product) throw new AppError(400, 'PRODUCT_NOT_FOUND', 'Product not found');

  let amount = product.amount;

  if (promoCode) {
    const promoEntry = PROMO_CODES[promoCode.toUpperCase()];
    if (promoEntry) {
      if (promoEntry.type === 'percent') {
        amount -= Math.round(amount * (promoEntry.value / 100));
      } else {
        amount = Math.max(0, amount - promoEntry.value);
      }
    }
  }

  const id = chkId();
  const chk = {
    id,
    checkoutId: id,
    userId: req.user.id,
    productId,
    amount,
    currency: product.currency,
    credits: product.credits || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  checkoutsStore.insert(chk);

  const { userId, ...publicCheckout } = chk;
  res.json({ ...publicCheckout, paymentUrl: paymentUrlFor(id) });
}));

// Public: the payment page loads checkout details by its unguessable id
checkout.get('/:checkoutId', asyncHandler((req, res) => {
  const chk = loadCheckout(req.params.checkoutId);
  const product = productsStore.findById(chk.productId);

  const { userId, ...publicCheckout } = chk;
  res.json({
    ...publicCheckout,
    productTitle: product ? product.title : chk.productId,
    paymentUrl: paymentUrlFor(chk.id),
  });
}));

// Public: confirm the test payment (always succeeds)
checkout.post('/:checkoutId/pay', asyncHandler((req, res) => {
  const chk = loadCheckout(req.params.checkoutId);
  if (chk.status !== 'pending') {
    throw new AppError(400, 'INVALID_STATUS', 'Checkout is not in pending status');
  }

  checkoutsStore.update(chk.id, { status: 'paid' });

  const payment = {
    id: payId(),
    userId: chk.userId,
    checkoutId: chk.id,
    amount: chk.amount,
    currency: chk.currency,
    credits: chk.credits || 0,
    status: 'paid',
    createdAt: new Date().toISOString(),
  };
  paymentsStore.insert(payment);

  const invoiceId = invId();
  const invoice = {
    id: invoiceId,
    userId: chk.userId,
    paymentId: payment.id,
    number: nextInvoiceNumber(),
    createdAt: new Date().toISOString(),
    downloadUrl: `/invoices/${invoiceId}/download`,
  };
  invoicesStore.insert(invoice);

  notifyOwner(
    chk,
    'Payment successful',
    `Your payment of ${(chk.amount / 100).toFixed(2)} ${chk.currency} has been processed.`,
  );

  res.json({ checkoutId: chk.id, status: 'paid', paymentId: payment.id });
}));

// Public: decline the test payment
checkout.post('/:checkoutId/decline', asyncHandler((req, res) => {
  const chk = loadCheckout(req.params.checkoutId);
  if (chk.status !== 'pending') {
    throw new AppError(400, 'INVALID_STATUS', 'Checkout is not in pending status');
  }

  checkoutsStore.update(chk.id, { status: 'failed' });

  notifyOwner(chk, 'Payment failed', 'Your payment could not be processed. Please try again.');

  res.json({ checkoutId: chk.id, status: 'failed', paymentId: null });
}));

// --- Payments list router ---
const payments = Router();

payments.get('/', requireAuth, asyncHandler((req, res) => {
  const userPayments = paymentsStore.filterBy('userId', req.user.id);
  res.json(userPayments.map(({ userId, ...p }) => p));
}));

// --- Billing router ---
const billing = Router();

billing.get('/summary', requireAuth, asyncHandler((req, res) => {
  const paid = paymentsStore.filterBy('userId', req.user.id).filter((p) => p.status === 'paid');
  const pending = checkoutsStore.filterBy('userId', req.user.id).filter((c) => c.status === 'pending');

  res.json({
    totalSpent: paid.reduce((sum, p) => sum + p.amount, 0),
    availableCredits: paid.reduce((sum, p) => sum + (p.credits || 0), 0),
    pendingAmount: pending.reduce((sum, c) => sum + c.amount, 0),
    pendingCount: pending.length,
    currency: 'USD',
  });
}));

module.exports = { products, promo, checkout, payments, billing };
