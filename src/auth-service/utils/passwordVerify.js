import bcrypt from 'bcrypt';

export const passwordVerify = async (data, hash) => {
  if (!data || !hash) {
    throw new Error('data and hash arguments required');
  }
  try {
    return await bcrypt.compare(data, hash);
  } catch (error) {
    throw new Error('Erro ao verificar a senha: ' + error.message);
  }
};
