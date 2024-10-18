export default class UserResDTO {
  /**
   * @param {Object} user
   * @param {string} user.id
   * @param {string} user.email
   * @param {string} user.userName
   * @param {boolean} user.active
   * @param {int} user.code
   * @param {string} user.password
   */

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.userName = user.userName;
    this.active = user.active;
    this.code = user.code;
    this.password = user.password;
  }
}
