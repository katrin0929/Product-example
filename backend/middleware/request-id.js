const { reqId } = require('../lib/id');

function requestId(req, res, next) {
  req.requestId = reqId();
  res.setHeader('X-Request-Id', req.requestId);
  next();
}

module.exports = requestId;
