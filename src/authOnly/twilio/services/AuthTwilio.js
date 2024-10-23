/**
 *  Lógica de negócios para autenticação
 * @module services/AuthTwilioService
 */

import jwt from 'jsonwebtoken';
import { TwilioIntegration } from '../integrations/TwilioIntegration.js';
import { AuthUserTwilioRepository } from '../repositories/UserRepository.js';

export class AuthTwilioService {
  constructor() {
    this.twilioIntegration = new TwilioIntegration();
    this.authUserTwilioRepository = new AuthUserTwilioRepository();
  }

  async initiatePhoneVerification(phoneNumber) {
    const verificationCode = this.generateVerificationCode(); // Gera um código de 6 dígitos

    try {
      // Envie o código via Twilio ou outro serviço
      const status = await this.twilioIntegration.sendVerificationCode(
        phoneNumber,
        verificationCode
      );

      return { status, verificationCode }; // Retorne o código se necessário
    } catch (error) {
      this.handleError('Erro na verificação', error);
    }
  }

  async verifyPhoneCode(phoneNumber, code) {
    try {
      const isValid = await this.twilioIntegration.verifyCode(
        phoneNumber,
        code
      );

      if (isValid) {
        await this.updateVerificationStatus(phoneNumber);

        const user =
          await this.authUserTwilioRepository.findByPhone(phoneNumber);
        const token = this.generateToken(user.id, phoneNumber);

        return { success: true, token };
      }

      return { success: false, message: 'Código inválido' };
    } catch (error) {
      this.handleError('Erro na verificação do código', error);
    }
  }

  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async updateVerificationStatus(phoneNumber) {
    return this.authUserTwilioRepository.updateVerificationStatus(
      phoneNumber,
      true
    );
  }

  generateToken(userId, phoneNumber) {
    return jwt.sign({ userId, phoneNumber }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  }

  handleError(message, error) {
    throw new Error(`${message}: ${error.message}`);
  }
}
