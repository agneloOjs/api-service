import jwt from 'jsonwebtoken';
import { envConfig } from '../../../config/envConfig.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../I18n/pt-BR/UserTokenModel.js';

export const AuthGenerateToken = {
  /**
   * Gera um token JWT para o usuário
   * @param {string} userId
   * @returns {string}
   * @throws {Error} Se userId não for válido
   */
  generateToken: (userId) => {
    if (!userId) {
      throw new Error(`${I18n_USER_TOKEN_MESSAGE.USER_INVALID}`);
    }
    return jwt.sign({ id: userId }, envConfig.JWT.ACCESS_SECRET, {
      expiresIn: envConfig.JWT.ACCESS_EXPIRES_IN
    });
  },

  /**
   * Verifica e decodifica o token JWT
   * @param {string} token
   * @returns {Object}
   * @throws {Error}
   */
  verifyToken: (token) => {
    return jwt.verify(token, envConfig.JWT.ACCESS_SECRET);
  }
};
