import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../../../middleware/validate.js';
import { authLimiter } from '../../../middleware/rateLimiters.js';
// Replace with your actual controller imports based on Phase 2
import * as authController from '../../../controllers/auth.controller.js';

const router = Router();

router.post('/signup',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  validate,
  authController.signup
);

router.post('/login',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  authController.login
);

router.post('/forgot-password',
  authLimiter,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
  ],
  validate,
  authController.forgotPassword
);

router.post('/reset-password/:token',
  [
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  validate,
  authController.resetPassword
);

// Note: Logout and Google OAuth routes typically don't need body validation or the strict auth limiter.
router.post('/logout', authController.logout);

export default router;