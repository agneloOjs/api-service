/**
 * configuração central das rotas.
 * @module routes/main.routes
 */

import { Router } from 'express';
import privateRoutes from './private.routes.js';

const mainRoutes = Router();

mainRoutes.use('/', privateRoutes);

export default mainRoutes;
