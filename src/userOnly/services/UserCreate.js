import Logger from '../../shared/utils/Logger.js';
import UserCreateRepository from '../repositories/UserCreate.js';
import UserInputFactory from '../factories/UserInputFactory.js';

export default class UserCreateService {
  constructor() {
    this.userCreateRepository = new UserCreateRepository();
  }

  async createUser(userData) {
    try {
      // Cria o usuário
      const userCreated = await this.userCreateRepository.create({
        ...userData,
        active: true,
        code: 123456
      });

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso.',
        user: UserInputFactory.userInputDTO(userCreated)
      };
    } catch (error) {
      console.log(error);
      Logger.error(error);
      return {
        success: false,
        message: 'Erro ao cadastrar usuário.'
      };
    }
  }
}
