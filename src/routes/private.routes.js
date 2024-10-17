/**
 * Rotas privadas da API
 * @module routes/private
 */
import { Router } from 'express';
import CompanyPrivateRoutes from '../company/routes/CompanyPrivate.routes.js';
import userPrivateRoutes from '../user-service/routes/userPrivate.routes.js';

const privateRoutes = Router();

/**
 * Rotas privadas para empresa
 */
privateRoutes.use('/company-service', CompanyPrivateRoutes);
/**
 * Rotas de usuário privadas
 */
privateRoutes.use('/user-service', userPrivateRoutes)

export default privateRoutes;
