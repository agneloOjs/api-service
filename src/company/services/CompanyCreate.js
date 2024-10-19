import CompanyCreateRepository from '../repositories/CompanyCreate.js';
import CompanyInputFactory from '../factories/CompanyInputFactory.js';
import CompanyCreateSanitizeData from '../utils/CompanyCreateSinetizeData.js';
import { CompanyCreateSchema } from '../validators/schemas/CompanyCreateSchema.js';
import Logger from '../../shared/utils/Logger.js';
import {
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../I18n/pt-BR/models/I18nCompanyBR.js';

/**
 * Classe de serviço para gerenciar a criação de empresas.
 */
export default class CompanyCreateService {
  constructor() {
    this.companyCreateRepository = new CompanyCreateRepository();
  }

  async createCompany(companyData, req, res) {
    try {
      const validationError = CompanyCreateSchema(companyData.cnpj);
      if (validationError !== true) {
        return {
          success: false,
          message: validationError
        };
      }

      const sanitizedData = CompanyCreateSanitizeData(companyData);
      const existingCompany = await this.companyCreateRepository.findByCnpj(
        sanitizedData.cnpj
      );
      if (existingCompany) {
        return {
          success: false,
          message: ERROR_COMPANY.CNPJ_ALREADY_EXISTS
        };
      }

      const companyCreated = await this.companyCreateRepository.create({
        ...sanitizedData,
        status: true,
        blocked: false,
        createdBy: userId
      });

      return {
        success: true,
        message: SUCCESS_COMPANY.CREATED_OK,
        company: CompanyInputFactory.companyInputDTO(companyCreated)
      };
    } catch (error) {
      console.log(error);
      Logger.error(error);
      return {
        success: false,
        message: ERROR_COMPANY.ERROR_CREATED
      };
    }
  }
}
