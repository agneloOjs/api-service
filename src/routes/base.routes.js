/**
 * configuração central das rotas.
 * @module routes
 */

import { Router } from 'express';
import publicRoutes from './public.routes.js';
import privateRoutes from './private.routes.js';

const routes = Router();

routes.use('/', publicRoutes);

routes.use('/', privateRoutes);

export default routes;
