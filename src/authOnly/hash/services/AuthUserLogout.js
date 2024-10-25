import { AuthUserRepository } from '../repositories/AuthRepository.js';
import Logger from '../../../shared/utils/Logger.js';

/**
 * Serviço responsável pela autenticação de usuários
 */
export class AuthUserLogoutService {
  constructor() {
    this.authUserRepository = new AuthUserRepository();
  }

  /**
   * Revoga o token atual
   * @param {string} accessToken
   * @returns {Promise<Object>}
   */
  async logout(accessToken) {
    try {
      await this.authUserRepository.revokeToken(accessToken);
      return {
        status: 200,
        message: 'Logout realizado com sucesso'
      };
    } catch (error) {
      console.log(error);
      Logger.error(error);
      return {
        status: 500,
        message: 'Erro ao realizar logout'
      };
    }
  }
}
