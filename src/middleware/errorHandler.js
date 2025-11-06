import { StatusCodes } from 'http-status-codes';

/**
 * Centralized error handling middleware for Express applications.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
export default function errorHandler(err, req, res, next) {
  // If response headers have already been sent, delegate to the default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // Log the error details for debugging (avoid exposing stack in production)
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error]', err);
  } else {
    // Minimal logging in production to avoid leaking sensitive info
    console.error('[Error]', err.message);
  }

  const responseBody = {
    status: status,
    message: err.message || 'An unexpected error occurred.'
  };

  // Include stack trace only in non‑production environments for easier debugging
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    responseBody.stack = err.stack;
  }

  res.status(status).json(responseBody);
}
