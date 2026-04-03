class AppError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      requestId: req.requestId,
    });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      code: 'FILE_TOO_LARGE',
      message: 'File exceeds maximum size',
      requestId: req.requestId,
    });
  }

  console.error('[ERROR]', err);
  res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
    requestId: req.requestId,
  });
}

// Wrap async route handlers to catch rejected promises
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { AppError, errorHandler, asyncHandler };
