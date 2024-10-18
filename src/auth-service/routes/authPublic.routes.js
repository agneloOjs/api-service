import { Router } from 'express';
import { AuthLoginController } from '../controllers/AuthLogin.js';

const authPublicRoutes = Router();
const authLoginController = new AuthLoginController();

/**
 * Rotas públicas para login.
 */
authPublicRoutes.post(
  '/login',
  authLoginController.login.bind(authLoginController) // Use a instância aqui
);

export default authPublicRoutes;
