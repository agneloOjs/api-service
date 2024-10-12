import { Router } from 'express';
import CompanyCreateController from '../../controllers/company/CompanyCreate.js';
import CompanyGetAllController from '../../controllers/company/CompanyGetAll.js';

const CompanyPrivateRoutes = Router();

/**
 * Instacia a classe do construtor.
 */
const companyCreateController = new CompanyCreateController();
const companyGetAllController = new CompanyGetAllController();

/**
 * Rotas privadas para empresa.
 */
CompanyPrivateRoutes.post(
  '/cadastrar-empresa',
  companyCreateController.create.bind(CompanyCreateController)
);
/**
 * Rotas privadas para empresa.
 */
CompanyPrivateRoutes.get(
  '/empresas',
  companyGetAllController.getAll.bind(CompanyGetAllController)
);

export default CompanyPrivateRoutes;
