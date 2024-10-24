import { AuthUserLoginService } from '../services/AuthUserLogin.js';

export class AuthUserController {
  constructor() {
    this.authUserLoginService = new AuthUserLoginService();
  }
  /**
   * Controller para login de usuário
   */
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await this.authUserLoginService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}
