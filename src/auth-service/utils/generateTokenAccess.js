import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN;

/**
 * Gera um token JWT para o usuário.
 * @param {string} userId
 * @param {string} ipAddress
 * @param {string} deviceId
 * @param {string} deviceType
 * @returns {Promise<string>}
 */
export const generateToken = (userId, ipAddress, deviceId, deviceType) => {
  const token = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION
  });
  return token;
};
