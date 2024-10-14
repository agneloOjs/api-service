import dbService from '../../config/dbService.js';

export default class UserCreateRepository {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   * @throws {Error}
   */

  async create(userData) {
    return dbService.user.create({ data: userData });
  }
}
