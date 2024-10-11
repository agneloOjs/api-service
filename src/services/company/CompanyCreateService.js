import CompanyCreateRepository from '../../repositories/company/CompanyCreate.js';
import CompanyInputFectory from '../../factories/company/CompanyInputFactory.js';
import CompanyCreateSanitizeData from '../../utils/company/CompanyCreateSinetizeData.js';
import { ERROR_MESSAGES } from '../../constants/ErrorMessages.js';
import Logger from '../../constants/Logger.js';
import { CompanyCreateSchema } from '../../validators/schemas/company/CompanyCreateSchema.js';

export default class CompanyCreateService {
  constructor() {
    this.companyCreateRepository = new CompanyCreateRepository();
  }

  async createCompany(companyData) {
    try {
      // Valida o campo corporateReason antes de prosseguir
      const validationError = CompanyCreateSchema(companyData.corporateReason);
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
        message: `${ERROR_MESSAGES.COMPANY_CREATED}`,
        company: CompanyInputFectory.companyInputDTO(CompanyCreate)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: `${ERROR_MESSAGES_BR.ERROR_CREATING_COMPANY}`
      };
    }
  }
}
