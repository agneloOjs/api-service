import { AuthTwilioService } from '../services/AuthTwilio.js';

export class AuthTwilioController {
  constructor() {
    this.authTwilioService = new AuthTwilioService();
  }
  async sendVerificationCode(req, res) {
    try {
      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return res
          .status(400)
          .json({ message: 'Número de telefone é obrigatório' });
      }

      const result =
        await this.authTwilioService.initiatePhoneVerification(phoneNumber);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async verifyCode(req, res) {
    try {
      const { phoneNumber, code } = req.body;

      if (!phoneNumber || !code) {
        return res
          .status(400)
          .json({ message: 'Número de telefone e código são obrigatórios' });
      }

      const result = await this.authTwilioService.verifyPhoneCode(
        phoneNumber,
        code
      );
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
}
