const fs = require('fs');
const path = require('path');
const Store = require('./store');

const users = new Store('users.json');
const documents = new Store('documents.json');
const notifications = new Store('notifications.json');
const refreshTokens = new Store('refresh-tokens.json');
const payments = new Store('payments.json');
const checkouts = new Store('checkouts.json');
const invoices = new Store('invoices.json');
const paymentMethods = new Store('payment-methods.json');
const exportsStore = new Store('exports.json');
const projects = new Store('projects.json');

const AVATARS_DIR = path.join(__dirname, '..', 'uploads', 'avatars');

function purge(store, userId) {
  store.writeAll(store.readAll().filter((r) => r.userId !== userId));
}

// Удаляет все документы пользователя: и записи, и файлы с диска.
function removeUserDocuments(userId) {
  for (const doc of documents.filterBy('userId', userId)) {
    try {
      fs.unlinkSync(doc.filePath);
    } catch {
      // File might already be deleted
    }
  }
  purge(documents, userId);
}

function revokeRefreshTokens(userId) {
  purge(refreshTokens, userId);
}

// Полное каскадное удаление пользователя и всех связанных данных.
// Используется и в DELETE /me, и в DELETE /admin/users/:userId.
function deleteUserCascade(userId) {
  users.remove(userId);
  removeUserDocuments(userId);
  purge(notifications, userId);
  purge(refreshTokens, userId);
  purge(payments, userId);
  purge(checkouts, userId);
  purge(invoices, userId);
  purge(paymentMethods, userId);
  purge(exportsStore, userId);

  // Владение проектом = членство в team[]; опустевшие проекты удаляем
  const remaining = projects.readAll()
    .map((p) => ({ ...p, team: (p.team || []).filter((id) => id !== userId) }))
    .filter((p) => p.team.length > 0);
  projects.writeAll(remaining);

  // Аватар хранится как `${userId}${ext}` — id фиксированной длины, коллизий нет
  try {
    for (const file of fs.readdirSync(AVATARS_DIR)) {
      if (file.startsWith(userId)) fs.unlinkSync(path.join(AVATARS_DIR, file));
    }
  } catch {
    // Directory might not exist
  }
}

module.exports = { deleteUserCascade, revokeRefreshTokens };
