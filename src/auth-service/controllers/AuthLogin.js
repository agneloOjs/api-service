import AuthLoginService from '../services/AuthLogin.js';

export default class AuthLoginController {
  constructor() {
    this.authLoginService = new AuthLoginService();
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    try {
      const { email, password, ipAddress, deviceId, deviceType } = req.body;
      const result = await this.authLoginService.loginService(
        email,
        password,
        ipAddress,
        deviceId,
        deviceType
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
