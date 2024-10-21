import UserInputDTO from '../dtos/UserInputDTO.js';

/**
 * @param {Object} user
 * @throws {Error}
 * @returns {UserInputDTO}
 */

export default class UserInputFactory {
  static userInputDTO(user) {
    return new UserInputDTO(user);
  }
}
