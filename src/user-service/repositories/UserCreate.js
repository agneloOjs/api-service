import dbService from '../../config/dbService.js';

export default class UserCreateRepository {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async create(userData) {
    try {
      return await dbService.user.create({ data: userData });
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async update(userId, data) {
    return await dbService.user.update({
      where: { id: userId },
      data
    });
  }
}
