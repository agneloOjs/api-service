export default class UserInputDTO {
  constructor(user) {
    this.id = user.id;
    this.createdAt = user.createdAt;
    this.email = user.email;
    this.userName = user.userName;
    this.active = user.active;
    this.code = user.code;
    this.password = user.password;
    this.createdBy = user.createdBy;
  }
}
