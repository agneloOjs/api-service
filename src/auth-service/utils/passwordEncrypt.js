// auth.js
import bcrypt from 'bcrypt';

// Função para criptografar a senha
export const passwordEncrypt = async (password) => {
  try {
    const saltRounds = 10; // Número de salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; // Retorna a senha criptografada
  } catch (error) {
    throw new Error('Erro ao criptografar a senha: ' + error.message);
  }
};
