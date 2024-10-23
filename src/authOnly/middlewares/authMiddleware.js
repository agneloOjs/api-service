/**
 * Verifica JWT para rotas protegidas
 * @module middlewares/authMiddleware
 */

import jwt from 'jsonwebtoken';
import Logger from '../../shared/utils/Logger.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    Logger.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
