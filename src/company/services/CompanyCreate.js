import CompanyCreateRepository from '../repositories/CompanyCreate.js';
import CompanyInputFectory from '../factories/CompanyInputFactory.js';
import CompanyCreateSanitizeData from '../utils/CompanyCreateSinetizeData.js';
import Logger from '../../shared/utils/Logger.js';
import {
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../I18n/pt-BR/models/I18nCompanyBR.js';

export default class CompanyCreateService {
  constructor() {
    this.companyCreateRepository = new CompanyCreateRepository();
  }

  async createCompany(companyData) {
    try {
      // Sanitizar os dados da empresa para garantir que apenas os campos permitidos sejam aceitos
      const sanitizedData = CompanyCreateSanitizeData(companyData);

      const CompanyCreate = await this.companyCreateRepository.create({
        ...sanitizedData,
        status: true,
        blocked: false
      });

      return {
        success: true,
        message: `${SUCCESS_COMPANY.CREATED_OK}`,
        company: CompanyInputFectory.companyInputDTO(CompanyCreate)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: `${ERROR_COMPANY.ERROR_CREATED}`
      };
    }
  }
}
