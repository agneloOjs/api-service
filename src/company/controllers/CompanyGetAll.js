import CompanyGetAllService from '../services/CompanyGetAll.js';
import { ERROR_MESSAGES_BR } from '../I18n/pt-BR/message/ErrorMessagesBR.js';
import Logger from '../../shared/utils/Logger.js';

/**
 * Classe de controle para gerenciar as requisições de obtenção de todas as empresas.
 */
export default class CompanyGetAllController {
  /**
   * Cria uma instância da classe CompanyGetAllController.
   * Inicializa o serviço de obtenção de empresas.
   */
  constructor() {
    this.companyGetAllService = new CompanyGetAllService();
    this.getAll = this.getAll.bind(this);
  }

  /**
   * Obtém todas as empresas.
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async getAll(req, res) {
    try {
      // Tenta obter todas as empresas do serviço
      const companies = await this.companyGetAllService.getAllCompanies();
      return res.status(200).json(companies);
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ message: `${ERROR_MESSAGES_BR.INTERNAL_SERVER_ERROR}` });
    }
  }
}
