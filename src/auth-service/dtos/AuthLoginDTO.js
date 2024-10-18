export class AuthLoginDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  validate() {
    if (!this.email || !this.password) {
      throw new Error('Email and password are required.');
    }
  }
}
