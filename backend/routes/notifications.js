const { Router } = require('express');
const Store = require('../lib/store');
const { asyncHandler } = require('../middleware/error-handler');
const requireAuth = require('../middleware/auth');

const notificationsStore = new Store('notifications.json');

const router = Router();
router.use(requireAuth);

// GET /notifications
router.get('/', asyncHandler((req, res) => {
  const userNotifications = notificationsStore
    .filterBy('userId', req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(userNotifications.map(({ userId, ...n }) => n));
}));

module.exports = router;
