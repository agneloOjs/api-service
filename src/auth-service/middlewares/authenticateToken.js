import { authVerifyToken } from '../utils/authVerifyToken.js';

export const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    // Usa a função authVerifyToken para verificar o token
    const user = await authVerifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};
