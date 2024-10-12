import CompanyInputDTO from '../dtos/CompanyInputDTO.js';

/**
 * Classe de fábrica para criar objetos DTO
 */
export default class CompanyInputFactory {
  /**
   * Cria um DTO de entrada a partir de um objeto de empresa.
   *
   * @param {Object} company
   * @throws {Error}
   * @returns {CompanyInputDTO}
   */
  static companyInputDTO(company) {
    // Verifica se a entrada é um objeto
    if (typeof company !== 'object' || company === null) {
      throw new Error('Invalid input: Expected an object.');
    }

    return new CompanyInputDTO(company);
  }
}
