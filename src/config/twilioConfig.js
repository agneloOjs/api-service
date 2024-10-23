/**
 * Configurações de ambiente da aplicação
 * @module config/twilioConfig
 */
import 'dotenv/config';

export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  verifyServiceSid: process.env.TWILIO_VERIFY_SERVICE_SID,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER
};
