import CompanyResDTO from '../dtos/CompanyResDTO.js';

export default class CompanyReqFactory {
  static companyResDTO(companies) {
    return companies.map((company) => new CompanyResDTO(company));
  }
}
