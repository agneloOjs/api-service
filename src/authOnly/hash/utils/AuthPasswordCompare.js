import bcrypt from 'bcrypt';
import Logger from '../../../shared/utils/Logger.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../I18n/pt-BR/UserTokenModel.js';

/**
 * Compara a senha fornecida com a senha criptografada.
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const AuthPasswordCompare = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    Logger.error(error);
    throw new Error(`${I18n_USER_TOKEN_MESSAGE.PASSWORD_COMPARE}`);
  }
};
