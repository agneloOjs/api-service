/**
 * Rotas privadas da API
 * @module routes/private
 */
import { Router } from 'express';
import CompanyPrivateRoutes from '../api-company-service/routes/CompanyPrivate.routes.js';

const privateRoutes = Router();

/**
 * Rotas privadas para empresa
 */
privateRoutes.use('/company-service', CompanyPrivateRoutes);
/**
 * Rotas de usuário privadas
 *
 */

export default privateRoutes;
