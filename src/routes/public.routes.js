/**
 * Rotas publicas da API
 * @module routes/publicRoutes
 */

import { Router } from 'express';
import authPublicRoutes from '../authOnly/routes/authPublic.routes.js';

const publicRoutes = Router();

publicRoutes.use('/authOnly', authPublicRoutes);

export default publicRoutes;
