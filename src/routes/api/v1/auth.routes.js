import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import { success, fail } from '../../../utils/response.js';
import { BCRYPT_COST } from '../../../utils/constants.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json(fail('EMAIL_EXISTS', 'Email already in use'));

    const hashedPassword = await bcrypt.hash(password, BCRYPT_COST);
    const user = await User.create({ name, email, password: hashedPassword });
    
    // Auto-login after signup
    req.login(user, (err) => {
      if (err) throw err;
      res.status(201).json(success({ user: { id: user._id, name: user.name, email: user.email } }));
    });
  } catch (err) {
    res.status(500).json(fail('SERVER_ERROR', err.message));
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json(success({ user: { id: req.user._id, name: req.user.name, email: req.user.email } }));
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json(fail('SERVER_ERROR', 'Could not log out'));
    req.session.destroy();
    res.clearCookie('connect.sid'); // default session cookie name
    res.status(200).json(success({ message: 'Logged out successfully' }));
  });
});

// Get current user (for React to check if logged in on refresh)
router.get('/me', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json(fail('NOT_AUTHENTICATED', 'No valid session'));
  res.status(200).json(success({ user: req.user }));
});

export default router;