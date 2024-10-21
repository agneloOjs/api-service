import dbService from '../../../config/dbService.js';

export class UserfindUniqueRepository {
  // Método da classe que busca o usuário pelo id
  async findById(id) {
    return await dbService.user.findUnique({ where: { id } });
  }

  // Método da classe que busca o usuário pelo email
  async findByEmail(email) {
    return await dbService.user.findUnique({ where: { email } });
  }

  // Método da classe que busca o usuário pelo código
  async findByCode(code) {
    return await dbService.user.findUnique({ where: { code } });
  }
}
