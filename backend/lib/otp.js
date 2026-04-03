const config = require('../config');

// In-memory OTP storage: key -> { code, expiresAt }
const otpStore = new Map();

function generateOtp(purpose, email) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const key = `${purpose}:${email}`;

  otpStore.set(key, {
    code,
    expiresAt: Date.now() + config.OTP_TTL_MS,
  });

  // Auto-cleanup after TTL
  setTimeout(() => otpStore.delete(key), config.OTP_TTL_MS);

  console.log(`[OTP] ${purpose} ${email}: ${code}`);
  return code;
}

function verifyOtp(purpose, email, code) {
  const key = `${purpose}:${email}`;
  const entry = otpStore.get(key);

  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(key);
    return false;
  }
  if (entry.code !== code) return false;

  otpStore.delete(key);
  return true;
}

module.exports = { generateOtp, verifyOtp };
