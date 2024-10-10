/**
 * Rotas públicas da API
 * @module routes/public
 */
import { Router } from 'express';

const publicRoutes = Router();

/**
 * Rotas usuários
 */

/**
 * Rotas de autenticação
 */

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
