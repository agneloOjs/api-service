import dbService from "../../config/dbService.js";

export default class UserGetAllRepository {
  /**
   * @param {Object} userData
   * @returns {Promise<Object>}
   * @throws {Error}
   */

  async findAll(userData) {
    return dbService.user.findMany({ data: userData })
  }
}
