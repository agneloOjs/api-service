import CompanyCreateRepository from '../../repositories/company/CompanyCreate.js';
import CompanyInputFectory from '../../factories/company/CompanyInputFactory.js';
import CompanyCreateSanitizeData from '../../utils/company/CompanyCreateSinetizeData.js';
import { CompanyCreateSchema } from '../../validators/schemas/company/CompanyCreateSchema.js';
import {
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../../I18n/pt-BR/models/I18nCompanyBR.js';
import Logger from '../../constants/Logger.js';
import { ERROR_MESSAGES_BR } from '../../I18n/pt-BR/message/ErrorMessagesBR.js';

export default class CompanyCreateService {
  constructor() {
    this.companyCreateRepository = new CompanyCreateRepository();
  }

  async createCompany(companyData) {
    try {
      // Valida o campo corporateReason antes de prosseguir
      const validationError = CompanyCreateSchema(
        companyData.corporateReason,
        companyData.cnpj
      );
      if (validationError !== true) {
        return {
          success: false,
          message: validationError // Retorna a mensagem de erro da validação
        };
      }
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
