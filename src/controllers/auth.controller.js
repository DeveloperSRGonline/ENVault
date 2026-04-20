import { success } from '../utils/response.js';

// Stub controller functions for Phase 3 testing
// These will be replaced with actual implementations in Phase 2

export const signup = (req, res) => {
  res.json(success({ message: 'Signup endpoint - stub' }));
};

export const login = (req, res) => {
  res.json(success({ message: 'Login endpoint - stub' }));
};

export const forgotPassword = (req, res) => {
  res.json(success({ message: 'Forgot password endpoint - stub' }));
};

export const resetPassword = (req, res) => {
  res.json(success({ message: 'Reset password endpoint - stub' }));
};

export const logout = (req, res) => {
  res.json(success({ message: 'Logout endpoint - stub' }));
};
