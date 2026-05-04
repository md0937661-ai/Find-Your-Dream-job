// ─────────────────────────────────────────
// @desc    404 Route Not Found
// ─────────────────────────────────────────
export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};


// ─────────────────────────────────────────
// @desc    Global Error Handler
// ─────────────────────────────────────────
export const errorHandler = (err, req, res, next) => {
  // Status code set karo
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ─────────────────────────────────────────
  // Mongoose — Invalid ObjectId Error
  // ─────────────────────────────────────────
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found — Invalid ID';
  }

  // ─────────────────────────────────────────
  // Mongoose — Duplicate Key Error
  // ─────────────────────────────────────────
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // ─────────────────────────────────────────
  // Mongoose — Validation Error
  // ─────────────────────────────────────────
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // ─────────────────────────────────────────
  // JWT Errors
  // ─────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired — Please login again';
  }

  // ─────────────────────────────────────────
  // Multer Errors
  // ─────────────────────────────────────────
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size too large — Max 5MB allowed';
    } else {
      message = err.message;
    }
  }

  return res.status(statusCode).json({
    message,
    success: false,
    // Development mein stack trace dikhao
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};