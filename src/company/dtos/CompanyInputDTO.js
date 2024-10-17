/**
 * Classe Data Transfer Object (DTO) para entrada de dados da empresa.
 */
export default class CompanyInputDTO {
  /**
   * Cria uma instância de CompanyInputDTO.
   *
   * @param {Object} company
   * @param {string} company.id
   * @param {string} company.corporateReason
   * @param {string} company.cnpj
   * @param {boolean} company.status
   * @param {boolean} company.blocked
   * @param {string} company.createdBy
   * @param {string} company.ownerId
   */
  constructor(company) {
    this.id = company.id;
    this.corporateReason = company.corporateReason;
    this.cnpj = company.cnpj;
    this.status = company.status;
    this.blocked = company.blocked;
    this.createdBy = company.createdBy; 
    this.ownerId = company.ownerId; 
  }
}
