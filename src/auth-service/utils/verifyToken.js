import jwt from 'jsonwebtoken';
import dbService from '../../config/dbService.js';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;

/**
 * Verifica se o token é válido.
 * @param {string} accessToken
 * @returns {Promise<string>}
 * @throws {Error}
 */
export const AuthVerifyToken = async (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN);

    const tokenRecord = await dbService.userToken.findFirst({
      where: { accessToken }
    });

    if (
      !tokenRecord ||
      tokenRecord.revoked ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new Error('Token inválido ou expirado.');
    }

    return decoded.userId;
  } catch (error) {
    console.log(error);
    throw new Error('Erro na verificação do token');
  }
};
