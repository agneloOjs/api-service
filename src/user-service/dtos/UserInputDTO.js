export default class UserInputDTO {
  /**
   * @param {Object} user
   * @param {string} user.id
   * @param {string} user.email
   * @param {string} user.userName
   * @param {string} user.password
   * @param {boolean} user.active
   * @param {int} user.code
   *
   */

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.userName = user.userName;
    this.password = user.password;
    this.active = user.active;
    this.code = user.code;
  }
}
