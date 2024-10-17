import dbService from '../../config/dbService.js';

export class UserFindByCode {
  // Método da classe que busca o usuário pelo código
  async findByCode(code) {
    return await dbService.user.findUnique({ where: { code } });
  }
}
