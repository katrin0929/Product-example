const { Router } = require('express');
const Store = require('../lib/store');
const { asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');

const invoicesStore = new Store('invoices.json');

const router = Router();
router.use(requireAuth);

// GET /invoices
router.get('/', asyncHandler((req, res) => {
  const userInvoices = invoicesStore.filterBy('userId', req.user.id);
  res.json(userInvoices.map(({ userId, ...inv }) => inv));
}));

module.exports = router;
