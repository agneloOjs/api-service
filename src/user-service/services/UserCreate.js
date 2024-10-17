import Logger from '../../shared/utils/Logger.js';
import UserCreateRepository from '../repositories/UserCreate.js';
import UserInputFactory from '../factories/UserInputFactory.js';
import { encryptPassword } from '../../auth-service/utils/encryptPassword.js';
import { generateCode } from '../utils/generateCode.js';

export default class UserCreateService {
  constructor() {
    this.userCreateRepository = new UserCreateRepository();
  }

  async createUser(userData) {
    // Gera um código único
    const userCode = await generateCode();

    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await encryptPassword(userData.password);

    try {
      const userCreated = await this.userCreateRepository.create({
        ...userData,
        active: true,
        code: userCode,
        password: hashedPassword
      });

      return {
        success: true,
        message: 'Usuário cadastrado com sucesso.',
        user: UserInputFactory.userInputDTO(userCreated)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: 'Erro ao cadastrar usuário.'
      };
    }
  }
}
