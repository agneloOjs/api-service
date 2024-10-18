import bcrypt from 'bcrypt';

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
    console.error('Erro ao comparar as senhas:', error);
    throw new Error('Erro ao comparar as senhas');
  }
};
