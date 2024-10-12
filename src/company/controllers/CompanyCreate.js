import CompanyCreateService from '../services/CompanyCreate.js';
import { ERROR_MESSAGES_BR } from '../../shared/I18n/pt-BR/ErrorMessagesBR.js';
import Logger from '../../shared/utils/Logger.js';

export default class CompanyCreateController {
  constructor() {
    this.companyCreateService = new CompanyCreateService();
  }

  create = async (req, res) => {
    try {
      const newCompany = await this.companyCreateService.createCompany(
        req.body
      );

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
