import { Router } from 'express';
import { authenticateController } from '../controllers/authenticateToken.js';

const authPublicRoutes = Router();

/**
 * Rotas privadas para logout .
 */
authPublicRoutes.post('/login', authenticateController.login);

export default authPublicRoutes;
