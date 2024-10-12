// CompanyInputFactory.js
import CompanyInputDTO from '../dtos/CompanyInputDTO.js';

export default class CompanyInputFectory {
  static companyInputDTO(company) {
    // Verifica se a entrada é um objeto
    if (typeof company !== 'object' || company === null) {
      throw new Error('Invalid input: Expected an object.');
    }

    return new CompanyInputDTO(company);
  }
}
