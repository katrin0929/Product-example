// Usage: npm run create-admin -- <email> <password> [name]
// Adds an admin user for the admin client without touching other data.
const bcrypt = require('bcryptjs');
const Store = require('../lib/store');
const { admId } = require('../lib/id');

const adminUsers = new Store('admin-users.json');

const [email, password, name] = process.argv.slice(2);

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.js <email> <password> [name]');
  process.exit(1);
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters');
  process.exit(1);
}

if (adminUsers.findBy('email', email)) {
  console.error(`Admin with email ${email} already exists`);
  process.exit(1);
}

const admin = {
  id: admId(),
  email,
  name: name || 'Admin',
  passwordHash: bcrypt.hashSync(password, 10),
  createdAt: new Date().toISOString(),
};

adminUsers.insert(admin);
console.log(`Admin created: ${admin.email} (${admin.id})`);
