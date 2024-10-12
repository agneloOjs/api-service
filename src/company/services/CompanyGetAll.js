import CompanyGetAllRepository from '../repositories/CompanyGetAll.js';
import CompanyReqFactory from '../factories/CompanyReqFectory.js';
import Logger from '../../shared/utils/Logger.js';
import {
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../I18n/pt-BR/models/I18nCompanyBR.js';

export default class CompanyGetAllService {
  constructor() {
    this.companyGetAllRepository = new CompanyGetAllRepository();
  }

  async getAllCompanies() {
    try {
      const companies = await this.companyGetAllRepository.companyFindAll();
      return {
        success: true,
        message: `${SUCCESS_COMPANY.LIST_ALL}`,
        company: CompanyReqFactory.companyResDTO(companies)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: `${ERROR_COMPANY.NOT_FOUND_ALL}`
      };
    }
  }
}
