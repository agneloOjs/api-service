import bcrypt from 'bcrypt';
import { I18n_USER_MESSAGE } from '../I18n/pt-BR/UserModel.js';

/**
 * Função para criptografar a senha
 */
export const passwordEncrypt = async (password) => {
  // Validações para verificar o formato da senha
  if (password === undefined) {
    throw new Error(I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT);
  }
  if (password === null) {
    throw new Error(I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT);
  }
  if (typeof password !== 'string') {
    throw new Error(I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT);
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error(
      `${I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT}: ` + error.message
    );
  }
};
