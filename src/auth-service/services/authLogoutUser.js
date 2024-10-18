import { authsClearRefreshToken } from '../repositories/AuthsClearRefreshToken.js';

export const autthLogoutUser = async (refreshToken) => {
  await authsClearRefreshToken(refreshToken);
  return { message: 'Logged out successfully' };
};
