import CompanyGetAllRepository from '../repositories/CompanyGetAll.js';
import CompanyResFactory from '../factories/CompanyResFectory.js';
import Logger from '../../shared/utils/Logger.js';
import {
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../I18n/pt-BR/models/I18nCompanyBR.js';

/**
 * Classe de serviço para gerenciar a obtenção de todas as empresas.
 */
export default class CompanyGetAllService {
  /**
   * Cria uma instância da classe CompanyGetAllService.
   * Inicializa o repositório de obtenção de empresas.
   */
  constructor() {
    this.companyGetAllRepository = new CompanyGetAllRepository();
  }

  /**
   * Obtém todas as empresas.
   *
   * @returns {Promise<Object>}   *
   * @throws {Error}
   */
  async getAllCompanies() {
    try {
      // Tenta obter todas as empresas do repositório
      const companies = await this.companyGetAllRepository.companyFindAll();

      return {
        success: true,
        message: SUCCESS_COMPANY.LIST_ALL,
        company: CompanyResFactory.companyResDTO(companies)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: ERROR_COMPANY.NOT_FOUND_ALL
      };
    }
  }
}
