export default class CompanyInputDTO {
  constructor(company) {
    this.id = company.id;
    this.corporateReason = company.corporateReason;
    this.cnpj = company.cnpj;
    this.status = company.status;
    this.blocked = company.blocked;
  }
}
