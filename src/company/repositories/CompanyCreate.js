import dbService from '../../config/dbService.js';

/**
 * Classe de repositório para gerenciar a criação de empresas.
 */
export default class CompanyCreateRepository {
  /**
   * Cria uma nova empresa no banco de dados.
   *
   * @param {Object} companyData
   * @returns {Promise<Object>}
   * @throws {Error}
   */
  async create(companyData) {
    // Verifica se os dados da empresa são válidos
    if (!companyData || typeof companyData !== 'object') {
      throw new Error('Invalid company data');
    }

    // Cria a empresa no banco de dados usando o serviço de banco de dados
    return dbService.company.create({ data: companyData });
  }
}
