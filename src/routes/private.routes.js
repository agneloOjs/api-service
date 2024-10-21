/**
 * Rotas privadas da API
 * @module routes/private
 */
import { Router } from 'express';
import userPrivateRoutes from '../userOnly/routes/userPrivate.routes.js';

const privateRoutes = Router();

/**
 * Rotas de usuário privadas
 */
privateRoutes.use('/user-service', userPrivateRoutes);

export default privateRoutes;
