import CompanyResDTO from '../dtos/CompanyResDTO.js';

/**
 * Classe de fábrica para criar objetos (DTO) de empresas.
 */
export default class CompanyResFactory {
  /**
   * Cria uma lista de DTOs a partir de uma lista de empresas.
   *
   * @param {Array<Object>} companies
   * @returns {Array<CompanyResDTO>}
   */
  static companyResDTO(companies) {
    // Mapeia cada empresa para um objeto CompanyResDTO
    return companies.map((company) => new CompanyResDTO(company));
  }
}
