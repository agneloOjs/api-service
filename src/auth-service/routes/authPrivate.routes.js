import { Router } from 'express';
import { authLogoutController } from '../controllers/authLogoutUser.js';

const authPrivateRoutes = Router();

/**
 * Rotas privadas para logout .
 */
authPrivateRoutes.post('/logout', authLogoutController.logout);

export default authPrivateRoutes;
