const { Router } = require('express');
const Store = require('../lib/store');
const { chkId, payId, invId, ntfId } = require('../lib/id');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');
const { broadcast } = require('../ws/notifications');

const productsStore = new Store('products.json');
const checkoutsStore = new Store('checkouts.json');
const paymentsStore = new Store('payments.json');
const invoicesStore = new Store('invoices.json');
const notificationsStore = new Store('notifications.json');

// Hardcoded promo codes: code -> { type, value }
const PROMO_CODES = {
  SAVE10: { type: 'percent', value: 10 },
  HALF: { type: 'percent', value: 50 },
  FREE5: { type: 'fixed', value: 500 },
};

let invoiceCounter = 0;

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
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  checkoutsStore.insert(chk);

  const { userId, ...publicCheckout } = chk;
  res.json(publicCheckout);
}));

checkout.get('/:checkoutId', requireAuth, asyncHandler((req, res) => {
  const chk = checkoutsStore.findById(req.params.checkoutId);
  if (!chk || chk.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Checkout not found');
  }

  const { userId, ...publicCheckout } = chk;
  res.json(publicCheckout);
}));

checkout.post('/:checkoutId/pay', requireAuth, asyncHandler((req, res) => {
  const chk = checkoutsStore.findById(req.params.checkoutId);
  if (!chk || chk.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Checkout not found');
  }
  if (chk.status !== 'pending') {
    throw new AppError(400, 'INVALID_STATUS', 'Checkout is not in pending status');
  }

  // Pseudo-payment: 90% success
  const success = Math.random() > 0.1;
  const newStatus = success ? 'paid' : 'failed';

  checkoutsStore.update(chk.id, { status: newStatus });

  let paymentId = null;

  if (success) {
    const payment = {
      id: payId(),
      userId: req.user.id,
      checkoutId: chk.id,
      amount: chk.amount,
      currency: chk.currency,
      status: 'paid',
      createdAt: new Date().toISOString(),
    };
    paymentsStore.insert(payment);
    paymentId = payment.id;

    invoiceCounter++;
    const invoice = {
      id: invId(),
      userId: req.user.id,
      paymentId: payment.id,
      number: `INV-${new Date().getFullYear()}-${String(invoiceCounter).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      downloadUrl: null,
    };
    invoicesStore.insert(invoice);

    const notification = {
      id: ntfId(),
      userId: req.user.id,
      type: 'payment.status_updated',
      title: 'Payment successful',
      body: `Your payment of ${(chk.amount / 100).toFixed(2)} ${chk.currency} has been processed.`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    notificationsStore.insert(notification);

    const { userId, ...publicNotification } = notification;
    broadcast(req.user.id, publicNotification);
  } else {
    const notification = {
      id: ntfId(),
      userId: req.user.id,
      type: 'payment.status_updated',
      title: 'Payment failed',
      body: 'Your payment could not be processed. Please try again.',
      createdAt: new Date().toISOString(),
      read: false,
    };
    notificationsStore.insert(notification);

    const { userId, ...publicNotification } = notification;
    broadcast(req.user.id, publicNotification);
  }

  res.json({ checkoutId: chk.id, status: newStatus, paymentId });
}));

// --- Payments list router ---
const payments = Router();

payments.get('/', requireAuth, asyncHandler((req, res) => {
  const userPayments = paymentsStore.filterBy('userId', req.user.id);
  res.json(userPayments.map(({ userId, ...p }) => p));
}));

module.exports = { products, promo, checkout, payments };
