import bcrypt from 'bcrypt';
import { envConfig } from '../../../config/envConfig.js';
import { I18n_USER_TOKEN_MESSAGE } from '../I18n/pt-BR/UserTokenModel.js';

export const AuthPasswordEncript = {
  /**
   * Gera um hash seguro para a senha
   * @param {string} password
   * @returns {Promise<string>}
   */
  passwordHash: async (password) => {
    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0
    ) {
      throw new Error(`${I18n_USER_TOKEN_MESSAGE.PASSWORD_INVALID}`);
    }

    return bcrypt.hash(password, Number(envConfig.JWT.SALT_ROUNDS));
  },

  /**
   * Verifica se a senha corresponde ao hash armazenado
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  passwordVerify: async (password, hash) => {
    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0
    ) {
      throw new Error('Senha inválida: a senha deve ser uma string não vazia.');
    }

    if (!hash || typeof hash !== 'string' || hash.trim().length === 0) {
      throw new Error('Hash inválido: o hash deve ser uma string não vazia.');
    }

    return await bcrypt.compare(password, hash);
  }
};
