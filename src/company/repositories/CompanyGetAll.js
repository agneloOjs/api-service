import dbService from '../../config/dbService.js';

/**
 * Classe de repositório para gerenciar a recuperação de empresas.
 */
export default class CompanyGetAllRepository {
  /**
   * Busca todas as empresas no banco de dados.
   *
   * @returns {Promise<Array>} Retorna uma lista de empresas.
   */
  async companyFindAll() {
    // Busca todas as empresas utilizando o serviço de banco de dados
    return dbService.company.findMany();
  }
}
