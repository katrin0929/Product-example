const { Router } = require('express');
const Store = require('../lib/store');
const { AppError, asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');
const { sendInvoiceHtml } = require('../lib/invoice-html');

const invoicesStore = new Store('invoices.json');

const router = Router();
router.use(requireAuth);

// GET /invoices
router.get('/', asyncHandler((req, res) => {
  const userInvoices = invoicesStore.filterBy('userId', req.user.id);
  res.json(userInvoices.map(({ userId, ...inv }) => inv));
}));

// GET /invoices/:invoiceId/download — чужой инвойс скрыт как несуществующий
router.get('/:invoiceId/download', asyncHandler((req, res) => {
  const invoice = invoicesStore.findById(req.params.invoiceId);
  if (!invoice || invoice.userId !== req.user.id) {
    throw new AppError(404, 'NOT_FOUND', 'Invoice not found');
  }
  sendInvoiceHtml(res, invoice);
}));

module.exports = router;
