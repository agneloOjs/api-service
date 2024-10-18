import dbService from '../../config/dbService.js';

export const authFindByIdUser = async (id) => {
  return await dbService.user.findUnique({
    where: { id }
  });
};
