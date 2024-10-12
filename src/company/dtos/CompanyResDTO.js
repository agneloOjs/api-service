/**
 * Classe Data Transfer Object (DTO) para resposta de dados da empresa.
 */
export default class CompanyResDTO {
  /**
   * Cria uma instância de CompanyResDTO.
   *
   * @param {Object} company
   * @param {string} company.id
   * @param {Date} company.createdAt
   * @param {Date} company.updatedAt
   * @param {string} company.email
   * @param {string} company.corporateReason
   * @param {string} company.fantasyName
   * @param {string} company.cnpj
   * @param {string} company.stateRegistration
   * @param {string} company.municipalRegistration
   * @param {string} company.nire
   * @param {string} company.taxationRegime
   * @param {string} company.operatingLicense
   * @param {Date} company.licenseValidity
   * @param {Date} company.openingDate
   * @param {boolean} company.status
   * @param {boolean} company.blocked
   * @param {string} company.mainCnae
   * @param {string[]} company.secondaryCnae
   * @param {string} company.fiscalResponsibleName
   * @param {string} company.fiscalResponsibleCpf
   * @param {string} company.fiscalResponsibleRne
   * @param {boolean} company.hasDigitalCertificate
   * @param {string} company.digitalCertificate
   * @param {boolean} company.validatedDigitalCertificate
   * @param {string} company.regularizationProcessNumber
   * @param {string} company.fiscalObservations
   * @param {string} company.createdBy
   */
  constructor(company) {
    this.id = company.id;
    this.createdAt = company.createdAt;
    this.updatedAt = company.updatedAt;
    this.email = company.email;
    this.corporateReason = company.corporateReason;
    this.fantasyName = company.fantasyName;
    this.cnpj = company.cnpj;
    this.stateRegistration = company.stateRegistration;
    this.municipalRegistration = company.municipalRegistration;
    this.nire = company.nire;
    this.taxationRegime = company.taxationRegime;
    this.operatingLicense = company.operatingLicense;
    this.licenseValidity = company.licenseValidity;
    this.openingDate = company.openingDate;
    this.status = company.status;
    this.blocked = company.blocked;
    this.mainCnae = company.mainCnae;
    this.secondaryCnae = company.secondaryCnae;
    this.fiscalResponsibleName = company.fiscalResponsibleName;
    this.fiscalResponsibleCpf = company.fiscalResponsibleCpf;
    this.fiscalResponsibleRne = company.fiscalResponsibleRne;
    this.hasDigitalCertificate = company.hasDigitalCertificate;
    this.digitalCertificate = company.digitalCertificate;
    this.validatedDigitalCertificate = company.validatedDigitalCertificate;
    this.regularizationProcessNumber = company.regularizationProcessNumber;
    this.fiscalObservations = company.fiscalObservations;
    this.createdBy = company.createdBy;
  }
}
