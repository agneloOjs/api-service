/**
 * configuração central das rotas.
 * @module routes
 */

import { Router } from 'express';
import publicRoutes from './public.routes.js';

const routes = Router();

routes.use('/', publicRoutes);

export default routes;
