import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN;

/**
 * Gera um token JWT para o usuário.
 * @param {string} userId
 * @param {string} deviceId
 * @param {string} deviceType
 * @returns {Promise<string>}
 */
export const generateTokenAccess = (userId, deviceId, deviceType) => {
  const expiresAt = new Date(Date.now() + parseInt(ACCESS_TOKEN_EXPIRATION));

  const payload = {
    userId,
    expiresAt: expiresAt.toISOString(),
    ipAddress: '',
    deviceId,
    deviceType
  };

  try {
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION
    });

    return token;
  } catch (error) {
    console.error('Erro ao gerar o token:', error);
    throw new Error('Erro ao gerar o token');
  }
};
