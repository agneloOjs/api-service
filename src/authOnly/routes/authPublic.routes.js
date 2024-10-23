/**
 * @module routes/authPublicRoutes
 */
import { Router } from 'express';
import { AuthTwilioController } from '../twilio/controllers/AuthTwilio.js';

const authPublicRoutes = Router();

// Instancia a classe do controller
const uthTwilioController = new AuthTwilioController();

// Autenticação usando Twilio para verificação por SMS
authPublicRoutes.post(
  '/login',
  uthTwilioController.sendVerificationCode.bind(uthTwilioController)
);

export default authPublicRoutes;
