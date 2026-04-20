import rateLimit from 'express-rate-limit';
import { fail } from '../utils/response.js';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per IP
  handler: (req, res) => {
    res.status(429).json(fail("RATE_LIMIT", "Too many attempts. Please try again after 15 minutes."));
  }
});

export const revealLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per IP
  handler: (req, res) => {
    res.status(429).json(fail("RATE_LIMIT", "Too many reveal requests. Slow down."));
  }
});

export const importLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per IP
  handler: (req, res) => {
    res.status(429).json(fail("RATE_LIMIT", "Too many import requests. Please try again later."));
  }
});