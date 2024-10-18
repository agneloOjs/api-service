import { authFindByEmailUser } from '../repositories/AuthFindByEmailUser.js';
import { authGenerateAccessToken } from '../utils/authGenerateAccessToken.js';
import { passwordVerify } from '../utils/passwordVerify.js';
import { authUpdateRefreshToken } from '../repositories/AuthUpdateRefreshToken.js';
import { authGenerateRefreshToken } from '../utils/authGenerateRefreshToken.js';

export const authenticateUser = async (email, password, deviceName) => {
  // Buscando o usuário apenas pelo email
  const user = await authFindByEmailUser(email);

  // Verifica se o usuário foi encontrado
  if (!user) throw new Error('Invalid email or password');

  // Verifica se a senha é válida
  const isPasswordValid = await passwordVerify(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  // Geração dos tokens
  const accessToken = authGenerateAccessToken(user.id);
  const refreshToken = authGenerateRefreshToken(user.id);

  // Atualiza o refresh token no banco de dados
  await authUpdateRefreshToken(user.id, accessToken, refreshToken, deviceName); // Adicione deviceName se necessário

  // Retorna os tokens
  return { accessToken, refreshToken };
};
