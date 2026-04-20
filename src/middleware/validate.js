import { validationResult } from 'express-validator';
import { fail } from '../utils/response.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return 400 with the first validation error message
    return res.status(400).json(fail("VALIDATION_ERROR", errors.array()[0].msg));
  }
  next();
};