import CompanyInputDTO from '../dtos/CompanyInputDTO.js';

export default class CompanyInputFectory {
  static companyInputDTO(company) {
    return new CompanyInputDTO(company);
  }
}
