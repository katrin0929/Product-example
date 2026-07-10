const bcrypt = require('bcryptjs');
const Store = require('./lib/store');
const { admId } = require('./lib/id');

const products = new Store('products.json');
const users = new Store('users.json');
const adminUsers = new Store('admin-users.json');
const checkouts = new Store('checkouts.json');
const payments = new Store('payments.json');
const invoices = new Store('invoices.json');
const notifications = new Store('notifications.json');
const documents = new Store('documents.json');
const refreshTokens = new Store('refresh-tokens.json');
const exports_ = new Store('exports.json');
const projects = new Store('projects.json');

// Seed products
products.writeAll([
  { id: 'prd_basic', title: 'Basic Pack', description: 'Starter package with essential features', amount: 999, currency: 'USD', credits: 5 },
  { id: 'prd_pro', title: 'Pro Pack', description: 'Professional package with advanced tools', amount: 2999, currency: 'USD', credits: 14 },
  { id: 'prd_enterprise', title: 'Enterprise Pack', description: 'Full enterprise solution with premium support', amount: 9999, currency: 'USD', credits: 30 },
]);

// Seed default admin (admin client): admin@example.com / admin123
adminUsers.writeAll([
  {
    id: admId(),
    email: 'admin@example.com',
    name: 'Admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
    createdAt: new Date().toISOString(),
  },
]);

// Initialize empty collections
users.writeAll([]);
checkouts.writeAll([]);
payments.writeAll([]);
invoices.writeAll([]);
notifications.writeAll([]);
documents.writeAll([]);
refreshTokens.writeAll([]);
exports_.writeAll([]);
projects.writeAll([]);

console.log('Seed complete. Data files created in data/');
