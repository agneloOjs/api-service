import CompanyReqDTO from '../../dtos/company/CompanyReqDTO.js';

export default class CompanyReqFactory {
  static companyReqDTO(companies) {
    return companies.map((company) => new CompanyReqDTO(company));
  }
}
