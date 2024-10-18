import dbService from '../../config/dbService.js';

export const authsClearRefreshToken = async (refreshToken) => {
  return await dbService.userToken.deleteMany({
    where: { refreshToken }
  });
};
