import dbService from '../../config/dbService.js';

export const authUpdateRefreshToken = async (
  userId,
  accessToken,
  refreshToken
) => {
  return await dbService.userToken.update({
    where: { userId },
    data: {
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    }
  });
};
