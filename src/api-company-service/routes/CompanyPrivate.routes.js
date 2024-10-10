import { Router } from 'express';
import CompanyCreateController from '../controllers/CompanyCreateController.js';

const CompanyPrivateRoutes = Router();

/**
 * Instacia a classe do construtor.
 */
const companyCreateController = new CompanyCreateController();

/**
 * Rotas privadas para empresa.
 */
CompanyPrivateRoutes.post(
  '/cadastrar-empresa',
  companyCreateController.create.bind(CompanyCreateController)
);
export default CompanyPrivateRoutes;
