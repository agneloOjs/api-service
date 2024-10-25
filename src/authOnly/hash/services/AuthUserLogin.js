import AuthRepository from '../repositories/AuthRepository.js';
import AuthUserRepository from '../repositories/AuthUserRepository.js';
import { AuthPasswordEncript } from '../utils/AuthPasswordEncript.js';
import { AuthGenerateToken } from '../utils/AuthGenerateToken.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../I18n/pt-BR/UserTokenModel.js';
import { ERROR_MESSAGES } from '../../../shared/I18n/pt-BR/ErrorMessagesBR.js';
import Logger from '../../../shared/utils/Logger.js';

/**
 * Serviço responsável pela autenticação de usuários
 */
export class AuthUserLoginService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(email, password, ipAddress, deviceId, deviceType) {
    try {
      // Chamando o método estático corretamente
      const user = await AuthUserRepository.findByEmail(email);
      if (!user) {
        return {
          status: 404,
          message: `${I18n_USER_TOKEN_MESSAGE.USER_NOT_EXIST}`
        };
      }

      const validPassword = await AuthPasswordEncript.passwordVerify(
        password,
        user.password
      );
      if (!validPassword) {
        return {
          status: 401,
          message: `${I18n_USER_TOKEN_MESSAGE.PASSWORD_INVALID}`
        };
      }

      const token = AuthGenerateToken.generateToken(user.id);

      await this.authRepository.createToken({
        userId: user.id,
        accessToken: token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        ipAddress,
        deviceId,
        deviceType
      });

      const { password: _, ...userWithoutPassword } = user;

      return {
        status: 200,
        message: `${I18n_USER_TOKEN_MESSAGE.LOGIN_SUCCESS}`,
        token,
        user: userWithoutPassword
      };
    } catch (error) {
      console.log(error);
      Logger.error(error);
      return {
        status: 500,
        message: `${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}`
      };
    }
  }
}
