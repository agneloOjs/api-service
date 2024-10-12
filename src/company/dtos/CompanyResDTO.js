export default class CompanyResDTO {
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
