import Logger from '../../shared/utils/Logger.js';
import UserCreateRepository from '../repositories/UserCreate.js';
import UserInputFactory from '../factories/UserInputFactory.js';
import { passwordEncrypt } from '../utils/passwordEncrypt.js';
import { userGenerateCode } from '../utils/generateCode.js';

export default class UserCreateService {
  constructor() {
    this.userCreateRepository = new UserCreateRepository();
  }

  async createUser(userData) {
    // Gera um código único
    const userCode = await userGenerateCode();

    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await passwordEncrypt(userData.password);

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
