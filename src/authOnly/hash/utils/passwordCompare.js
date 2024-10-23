import bcrypt from 'bcrypt';
import Logger from '../../../shared/utils/Logger.js';

/**
 * Compara a senha fornecida com a senha criptografada.
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const passwordCompare = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    Logger.error(error);
    throw new Error('Erro ao comparar as senhas');
  }
};
