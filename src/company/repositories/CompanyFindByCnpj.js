import dbService from '../../config/dbService.js';

export default class CompanyFindByCnpjRepository {
  async findByCnpj(cnpj) {
    return dbService.company.findUnique({
      where: {
        cnpj: cnpj
      }
    });
  }
}
