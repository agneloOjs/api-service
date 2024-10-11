import CompanyInputDTO from '../../dtos/company/CompanyInputDTO.js';

export default class CompanyInputFectory {
  static companyInputDTO(company) {
    return new CompanyInputDTO(company);
  }
}
