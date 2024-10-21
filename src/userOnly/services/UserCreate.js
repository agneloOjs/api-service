import Logger from '../../shared/utils/Logger.js';
import UserCreateRepository from '../repositories/UserCreate.js';
import UserInputFactory from '../factories/UserInputFactory.js';
import { userSchemaCreate } from '../schemas/userShemaCreate.js';
import { I18n_USER_MESSAGE } from '../I18n/pt-BR/UserModel.js';

export default class UserCreateService {
  constructor() {
    this.userCreateRepository = new UserCreateRepository();
  }

  async createUser(userData) {
    // Validação dos dados do usuário
    const validationResult = userSchemaCreate(userData);

    // Se houver erros de validação
    if (validationResult.statusCode !== 200) {
      return {
        success: false,
        message: validationResult.messages[0]
      };
    }

    try {
      // Cria o usuário
      const userCreated = await this.userCreateRepository.create({
        ...userData,
        active: true,
        code: 123458
      });

      return {
        success: true,
        message: I18n_USER_MESSAGE.USER_CREATE_SUCCESS,
        user: UserInputFactory.userInputDTO(userCreated)
      };
    } catch (error) {
      console.log(error);
      Logger.error(error);
      return {
        success: false,
        message: I18n_USER_MESSAGE.USER_CREATE_ERROR
      };
    }
  }
}
