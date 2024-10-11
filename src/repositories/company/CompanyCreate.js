import dbService from '../../config/dbService.js';

export default class CompanyCreateRepository {
  async create(companyData) {
    return dbService.company.create({ data: companyData });
  }
}
