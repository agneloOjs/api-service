export class AuthLogoutDTO {
  constructor(userId) {
    this.userId = userId;
  }

  validate() {
    if (!this.userId) {
      throw new Error('User ID is required for logout.');
    }
  }
}
