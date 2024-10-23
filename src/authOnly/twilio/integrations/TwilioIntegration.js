/**
 * Lida com a integração com Twilio.
 * @module twilio/twilioIntegration
 */

import twilio from 'twilio';
import { twilioConfig } from '../../../config/twilioConfig.js';

export class TwilioIntegration {
  constructor() {
    this.client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  async sendVerificationCode(phoneNumber, verificationCode) {
    try {
      const message = await this.client.messages.create({
        body: `Seu código de verificação é: ${verificationCode}`,
        from: this.fromNumber,
        to: phoneNumber
      });

      return message;
    } catch (error) {
      throw new Error(`Erro ao enviar código: ${error.message}`);
    }
  }

  async verifyCode(phoneNumber, code) {
    try {
      const verificationCheck = await this.client.verify.v2
        .services(twilioConfig.verifyServiceSid)
        .verificationChecks.create({ to: phoneNumber, code });

      return verificationCheck.status === 'approved';
    } catch (error) {
      throw new Error(`Erro ao verificar código: ${error.message}`);
    }
  }
}
