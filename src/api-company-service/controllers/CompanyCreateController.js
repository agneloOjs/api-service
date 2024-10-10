import Logger from '../../constants/Logger.js';
import CompanyCreateService from '../services/CompanyCreateService.js';
import { ERROR_MESSAGES } from '../../constants/ErrorMessages.js';

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
        .json({ erro: `${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}` });
    }
  };
}
