import dbService from '../../../config/dbService.js';

/**
 * Repositório responsável pela interação com o banco de dados para usuários
 */
export default class AuthUserRepository {
  /**
   * Busca um usuário no banco de dados pelo email
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  static async findByEmail(email) {
    return await dbService.user.findUnique({ where: { email } });
  }
}
