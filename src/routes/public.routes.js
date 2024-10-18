/**
 * Rotas públicas da API
 * @module routes/public
 */
import { Router } from 'express';
import UserPublicRoutes from '../user-service/routes/UserPublic.routes.js';
import authPublicRoutes from '../auth-service/routes/authPublic.routes.js';

const publicRoutes = Router();

/**
 * Rotas usuários
 */
publicRoutes.use('/user-service', UserPublicRoutes);

/**
 * Rotas de autenticação
 */
/**
 */
publicRoutes.use('/', authPublicRoutes);
/**
 * Rota de health check
 */
publicRoutes.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

export default publicRoutes;
