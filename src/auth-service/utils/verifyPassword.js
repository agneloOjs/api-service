export const verifyPassword = async (password, hashedPassword) => {
  try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match; 
  } catch (error) {
      throw new Error('Erro ao verificar a senha: ' + error.message);
  }
};
