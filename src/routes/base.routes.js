/**
 * configuração central das rotas.
 * @module routes
 */

import { Router } from 'express';
import publicRoutes from './public.routes.js';
import privateRoutes from './private.routes.js';
import { authenticateUser } from '../auth-service/middlewares/authenticateToken.js';

const routes = Router();

routes.use('/', publicRoutes);

routes.use('/', authenticateUser, privateRoutes);

export default routes;
