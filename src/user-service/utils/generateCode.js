import { UserFindByCode } from '../repositories/UserFindByCode.js';

export const userGenerateCode = async (
  minCode = 100000,
  maxCode = 999999,
  maxAttempts = 10
) => {
  const userByCode = new UserFindByCode();
  let uniqueCode;
  let codeExists = true;
  let attempts = 0;

  while (codeExists && attempts < maxAttempts) {
    // Gera um número aleatório entre o intervalo definido
    uniqueCode = Math.floor(Math.random() * (maxCode - minCode + 1)) + minCode;

    try {
      // Verifica se o código já existe no banco de dados
      const existingUser = await userByCode.findByCode(uniqueCode);
      codeExists = !!existingUser;
    } catch (error) {
      // Loga o erro e segue com a próxima tentativa
      console.error(`Erro ao verificar código ${uniqueCode}:`, error);
    }

    attempts++;
  }

  // Verifica se encontrou um código único
  if (codeExists) {
    throw new Error(
      `Não foi possível gerar um código único após ${maxAttempts} tentativas.`
    );
  }

  return uniqueCode;
};
