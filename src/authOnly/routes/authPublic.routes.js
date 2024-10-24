/**
 * @module routes/authPublicRoutes
 */
import { Router } from 'express';
import { AuthUserController } from '../hash/controllers/AuthUserLogin.js';

const authPublicRoutes = Router();

// Instancia a classe do controller
const authUserController = new AuthUserController();

// Autenticação usando Twilio para verificação por SMS
authPublicRoutes.post(
  '/login',
  authUserController.login.bind(authUserController)
);

export default authPublicRoutes;
