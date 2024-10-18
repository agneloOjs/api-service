import dbService from '../../config/dbService.js';

export const authFindByEmailUser = async (email) => {
  return await dbService.user.findUnique({
    where: { email }
  });
};
