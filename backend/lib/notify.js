const Store = require('./store');
const { ntfId } = require('./id');
const { broadcast } = require('../ws/notifications');

const notificationsStore = new Store('notifications.json');

// Сохраняет уведомление и пушит его по WS (no-op, если пользователь офлайн)
function notifyUser(userId, title, body) {
  const notification = {
    id: ntfId(),
    userId,
    type: 'payment.status_updated',
    title,
    body,
    createdAt: new Date().toISOString(),
    read: false,
  };
  notificationsStore.insert(notification);

  const { userId: _omit, ...publicNotification } = notification;
  broadcast(userId, publicNotification);
}

module.exports = { notifyUser };
