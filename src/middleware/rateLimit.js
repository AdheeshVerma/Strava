import rateLimit from 'express-rate-limit';

const defaultOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
};

export const apiRateLimiter = rateLimit(defaultOptions);

export default apiRateLimiter;
