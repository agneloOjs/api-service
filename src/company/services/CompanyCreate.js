import CompanyCreateRepository from '../repositories/CompanyCreate.js';
import CompanyInputFactory from '../factories/CompanyInputFactory.js';
import CompanyCreateSanitizeData from '../utils/CompanyCreateSinetizeData.js';
import CompanyFindByCnpjRepository from '../repositories/CompanyFindByCnpj.js';
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
  /**
   * Cria uma instância da classe CompanyCreateService.
   * @param {CompanyCreateRepository} [companyCreateRepository=new CompanyCreateRepository()]
   * @param {CompanyFindByCnpjRepository} [companyFindByCnpjRepository=new CompanyFindByCnpjRepository()]
   */
  constructor(
    companyCreateRepository = new CompanyCreateRepository(),
    companyFindByCnpjRepository = new CompanyFindByCnpjRepository()
  ) {
    this.companyCreateRepository = companyCreateRepository;
    this.companyFindByCnpjRepository = companyFindByCnpjRepository;
  }

  /**
   * Cria uma nova empresa.
   *
   * @param {Object} companyData
   * @param {string} companyData.cnpj
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async createCompany(companyData) {
    try {
      // Valida o campo corporateReason antes de prosseguir
      const validationError = CompanyCreateSchema(companyData.cnpj);
      if (validationError !== true) {
        return {
          success: false,
          message: validationError
        };
      }
      // Sanitizar os dados da empresa para garantir que apenas os campos permitidos sejam aceitos
      const sanitizedData = CompanyCreateSanitizeData(companyData);

      // Verificar se a empresa já existe pelo CNPJ
      const existingCompany = await this.companyFindByCnpjRepository.findByCnpj(
        sanitizedData.cnpj
      );
      if (existingCompany) {
        return {
          success: false,
          message: ERROR_COMPANY.CNPJ_ALREADY_EXISTS
        };
      }

      // Criar a nova empresa
      const companyCreated = await this.companyCreateRepository.create({
        ...sanitizedData,
        status: true,
        blocked: false
      });

      return {
        success: true,
        message: SUCCESS_COMPANY.CREATED_OK,
        company: CompanyInputFactory.companyInputDTO(companyCreated)
      };
    } catch (error) {
      Logger.error(error);
      return {
        success: false,
        message: ERROR_COMPANY.ERROR_CREATED
      };
    }
  }
}
