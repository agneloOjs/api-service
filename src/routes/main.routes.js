/**
 * configuração central das rotas.
 * @module routes/main.routes
 */

import { Router } from 'express';
import publicRoutes from './public.routes.js';
import privateRoutes from './private.routes.js';

const mainRoutes = Router();

mainRoutes.use('/', publicRoutes);
mainRoutes.use('/', privateRoutes);

export default mainRoutes;
