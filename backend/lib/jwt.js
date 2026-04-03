const jwt = require('jsonwebtoken');
const config = require('../config');

function signAccessToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_ACCESS_TTL });
}

function signRefreshToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_REFRESH_TTL });
}

function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}

function generateTokens(user) {
  const payload = { sub: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const decoded = jwt.decode(accessToken);
  const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

  return { accessToken, refreshToken, expiresIn };
}

module.exports = { signAccessToken, signRefreshToken, verifyToken, generateTokens };
