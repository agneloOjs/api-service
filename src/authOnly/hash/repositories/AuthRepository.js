// AuthRepository.js
import dbService from '../../../config/dbService.js';

/**
 * Repositório responsável pela interação com o banco de dados para usuários
 */
export default class AuthRepository {
  /**
   * Cria e armazena um novo token no banco de dados
   * @param {Object} tokenData
   * @returns {Promise<Object>}
   */
  async createToken(tokenData) {
    return dbService.userToken.create({
      data: tokenData
    });
  }

  /**
   * Busca um token pelo accessToken
   * @param {string} accessToken
   * @returns {Promise<Object|null>}
   */
  async findByAccessToken(accessToken) {
    return dbService.userToken.findUnique({
      where: { accessToken }
    });
  }

  /**
   * Revoga um token (define revoked como true)
   * @param {string} accessToken
   * @returns {Promise<Object>}
   */
  async revokeToken(accessToken) {
    return dbService.userToken.update({
      where: { accessToken },
      data: { revoked: true }
    });
  }

  /**
   * Verifica se o token já foi revogado ou expirou
   * @param {string} accessToken
   * @returns {Promise<boolean>}
   */
  async isTokenInvalid(accessToken) {
    const token = await this.findByAccessToken(accessToken);
    if (!token || token.revoked || new Date() > token.expiresAt) {
      return true;
    }
    return false;
  }
}
