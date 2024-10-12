import CompanyCreateService from '../services/CompanyCreate.js';
import { ERROR_MESSAGES_BR } from '../../shared/I18n/pt-BR/ErrorMessagesBR.js';
import Logger from '../../shared/utils/Logger.js';

/**
 * Classe de controle para gerenciar as requisições de criação de empresas.
 */
export default class CompanyCreateController {
  /**
   * Cria uma instância da classe CompanyCreateController.
   * Inicializa o serviço de criação de empresas.
   */
  constructor() {
    this.companyCreateService = new CompanyCreateService();
  }

  /**
   * Cria uma nova empresa.
   *
   * @param {Object} req
   * @param {Object} req.body
   * @param {Object} res
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  create = async (req, res) => {
    try {
      // Tenta criar uma nova empresa usando os dados do corpo da requisição
      const newCompany = await this.companyCreateService.createCompany(
        req.body
      );

      // Verifica se a criação da empresa foi bem-sucedida
      if (newCompany.success) {
        return res.status(201).json(newCompany);
      } else {
        return res.status(400).json({ error: newCompany.message });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ erro: `${ERROR_MESSAGES_BR.INTERNAL_SERVER_ERROR}` });
    }
  };
}
