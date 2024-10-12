import CompanyGetAllService from '../services/CompanyGetAll.js';
import { ERROR_MESSAGES_BR } from '../I18n/pt-BR/message/ErrorMessagesBR.js';
import Logger from '../../shared/utils/Logger.js';

export default class CompanyGetAllController {
  constructor() {
    this.companyGetAllService = new CompanyGetAllService();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req, res) {
    try {
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
