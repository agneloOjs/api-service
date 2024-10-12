import dbService from '../../config/dbService.js';

export default class CompanyGetAllRepository {
  async companyFindAll() {
    return dbService.company.findMany();
  }
}
