import UserResDTO from "../dtos/UserResDTO.js";

/**
 * @param {Object} user
 * @throws {Error}
 * @param {UserResDTO}
 */

export default class UserResFectory {
  static userResDTO(users) {
    return users.map(user => new UserResDTO(user));
  }
  
}
