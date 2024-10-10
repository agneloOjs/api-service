import CompanyCreateRepository from '../repositories/CompanyCreate.js';
import CompanyInputFectory from '../factories/CompanyInputFactory.js';
import Logger from '../../constants/Logger.js';
import { ERROR_MESSAGES } from '../../constants/ErrorMessages.js';

export default class CompanyCreateService {
  constructor() {
    this.companyCreateRepository = new CompanyCreateRepository();
  }

  async createCompany(companyData) {
    try {
      const CompanyCreate = await this.companyCreateRepository.create({
        ...companyData,
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
        message: `${ERROR_MESSAGES.ERROR_CREATING_COMPANY}`
      };
    }
  }
}
