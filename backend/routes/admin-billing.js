const { Router } = require('express');
const Store = require('../lib/store');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAdmin = require('../middleware/admin-auth');
const { notifyUser } = require('../lib/notify');
const { sendInvoiceHtml } = require('../lib/invoice-html');

const checkoutsStore = new Store('checkouts.json');
const paymentsStore = new Store('payments.json');
const invoicesStore = new Store('invoices.json');
const usersStore = new Store('users.json');
const productsStore = new Store('products.json');

// Lookup-карты для обогащения: удалённый юзер -> null, удалённый продукт -> raw id
const userEmails = () => new Map(usersStore.readAll().map((u) => [u.id, u.email]));
const productTitles = () => new Map(productsStore.readAll().map((p) => [p.id, p.title]));

// --- Checkouts router ---
const checkouts = Router();
checkouts.use(requireAdmin);

// GET /admin/checkouts
checkouts.get('/', asyncHandler((req, res) => {
  const emails = userEmails();
  const titles = productTitles();
  res.json(checkoutsStore.readAll().map((chk) => ({
    ...chk,
    userEmail: emails.get(chk.userId) ?? null,
    productTitle: titles.get(chk.productId) ?? chk.productId,
  })));
}));

// POST /admin/checkouts/:checkoutId/cancel
checkouts.post('/:checkoutId/cancel', asyncHandler((req, res) => {
  const chk = checkoutsStore.findById(req.params.checkoutId);
  if (!chk) throw new AppError(404, 'NOT_FOUND', 'Checkout not found');
  if (chk.status !== 'pending') {
    throw new AppError(400, 'INVALID_STATUS', 'Only pending checkouts can be canceled');
  }

  const updated = checkoutsStore.update(chk.id, { status: 'failed' });
  notifyUser(chk.userId, 'Checkout canceled', 'Your pending checkout was canceled by support.');

  res.json(updated);
}));

// --- Payments router ---
const payments = Router();
payments.use(requireAdmin);

// GET /admin/payments
payments.get('/', asyncHandler((req, res) => {
  const emails = userEmails();
  const titles = productTitles();
  const chkById = new Map(checkoutsStore.readAll().map((c) => [c.id, c]));

  res.json(paymentsStore.readAll().map((p) => {
    const chk = chkById.get(p.checkoutId);
    return {
      ...p,
      userEmail: emails.get(p.userId) ?? null,
      productTitle: chk ? (titles.get(chk.productId) ?? chk.productId) : '—',
    };
  }));
}));

// POST /admin/payments/:paymentId/refund
payments.post('/:paymentId/refund', asyncHandler((req, res) => {
  const payment = paymentsStore.findById(req.params.paymentId);
  if (!payment) throw new AppError(404, 'NOT_FOUND', 'Payment not found');
  if (payment.status !== 'paid') {
    throw new AppError(400, 'INVALID_STATUS', 'Only paid payments can be refunded');
  }

  // Связанный checkout остаётся 'paid' — это историческая запись успешного списания;
  // billing summary и кредиты пересчитываются из статусов платежей автоматически
  const updated = paymentsStore.update(payment.id, { status: 'refunded' });
  notifyUser(
    payment.userId,
    'Payment refunded',
    `Your payment of ${(payment.amount / 100).toFixed(2)} ${payment.currency} has been refunded.`,
  );

  res.json(updated);
}));

// --- Invoices router ---
const invoices = Router();
invoices.use(requireAdmin);

// GET /admin/invoices
invoices.get('/', asyncHandler((req, res) => {
  const emails = userEmails();
  const payById = new Map(paymentsStore.readAll().map((p) => [p.id, p]));

  res.json(invoicesStore.readAll().map((inv) => {
    const payment = payById.get(inv.paymentId);
    return {
      ...inv,
      // Перекрываем user-путь (требует пользовательский токен) на admin-эндпоинт
      downloadUrl: `/admin/invoices/${inv.id}/download`,
      userEmail: emails.get(inv.userId) ?? null,
      amount: payment ? payment.amount : null,
      currency: payment ? payment.currency : null,
      paymentStatus: payment ? payment.status : null,
    };
  }));
}));

// GET /admin/invoices/:invoiceId/download
invoices.get('/:invoiceId/download', asyncHandler((req, res) => {
  const invoice = invoicesStore.findById(req.params.invoiceId);
  if (!invoice) throw new AppError(404, 'NOT_FOUND', 'Invoice not found');
  sendInvoiceHtml(res, invoice);
}));

module.exports = { checkouts, payments, invoices };
