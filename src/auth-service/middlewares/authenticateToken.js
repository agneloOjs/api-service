import express from 'express';
import { AuthVerifyToken } from '../utils/verifyToken.js';
const app = express();

/**
 * Middleware para autenticação usando token JWT.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const user = await AuthVerifyToken(token, user);
    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
