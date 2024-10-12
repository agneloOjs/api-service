import { describe, it, expect } from 'vitest';
import CompanyResDTO from '../../../../../src/company/dtos/CompanyResDTO.js';

describe('CompanyResDTO', () => {
  it('should create a DTO with valid company data', () => {
    const companyData = {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@company.com',
      corporateReason: 'Test Corp',
      fantasyName: 'Test',
      cnpj: '12.345.678/0001-90',
      stateRegistration: '123456789',
      municipalRegistration: '987654321',
      nire: '123456789',
      taxationRegime: 'Simples Nacional',
      operatingLicense: '123456',
      licenseValidity: new Date('2025-12-31'),
      openingDate: new Date('2020-01-01'),
      status: 'active',
      blocked: false,
      mainCnae: '6201-5/01',
      secondaryCnae: ['6202-3/00'],
      fiscalResponsibleName: 'Jane Doe',
      fiscalResponsibleCpf: '123.456.789-00',
      fiscalResponsibleRne: 'AB1234567',
      hasDigitalCertificate: true,
      digitalCertificate: 'cert.pem',
      validatedDigitalCertificate: true,
      regularizationProcessNumber: '123456789',
      fiscalObservations: 'No observations',
      createdBy: 'admin'
    };

    const dto = new CompanyResDTO(companyData);

    // Verificações
    expect(dto.id).toBe(companyData.id);
    expect(dto.createdAt).toBe(companyData.createdAt);
    expect(dto.updatedAt).toBe(companyData.updatedAt);
    expect(dto.email).toBe(companyData.email);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.fantasyName).toBe(companyData.fantasyName);
    expect(dto.cnpj).toBe(companyData.cnpj);
    expect(dto.stateRegistration).toBe(companyData.stateRegistration);
    expect(dto.municipalRegistration).toBe(companyData.municipalRegistration);
    expect(dto.nire).toBe(companyData.nire);
    expect(dto.taxationRegime).toBe(companyData.taxationRegime);
    expect(dto.operatingLicense).toBe(companyData.operatingLicense);
    expect(dto.licenseValidity).toBe(companyData.licenseValidity);
    expect(dto.openingDate).toBe(companyData.openingDate);
    expect(dto.status).toBe(companyData.status);
    expect(dto.blocked).toBe(companyData.blocked);
    expect(dto.mainCnae).toBe(companyData.mainCnae);
    expect(dto.secondaryCnae).toEqual(companyData.secondaryCnae);
    expect(dto.fiscalResponsibleName).toBe(companyData.fiscalResponsibleName);
    expect(dto.fiscalResponsibleCpf).toBe(companyData.fiscalResponsibleCpf);
    expect(dto.fiscalResponsibleRne).toBe(companyData.fiscalResponsibleRne);
    expect(dto.hasDigitalCertificate).toBe(companyData.hasDigitalCertificate);
    expect(dto.digitalCertificate).toBe(companyData.digitalCertificate);
    expect(dto.validatedDigitalCertificate).toBe(
      companyData.validatedDigitalCertificate
    );
    expect(dto.regularizationProcessNumber).toBe(
      companyData.regularizationProcessNumber
    );
    expect(dto.fiscalObservations).toBe(companyData.fiscalObservations);
    expect(dto.createdBy).toBe(companyData.createdBy);
  });

  it('should handle missing fields gracefully', () => {
    const companyData = {};
    const dto = new CompanyResDTO(companyData);

    // Verifica se os campos estão indefinidos
    expect(dto.id).toBeUndefined();
    expect(dto.createdAt).toBeUndefined();
    expect(dto.updatedAt).toBeUndefined();
    expect(dto.email).toBeUndefined();
    expect(dto.corporateReason).toBeUndefined();
    expect(dto.fantasyName).toBeUndefined();
    expect(dto.cnpj).toBeUndefined();
    expect(dto.stateRegistration).toBeUndefined();
    expect(dto.municipalRegistration).toBeUndefined();
    expect(dto.nire).toBeUndefined();
    expect(dto.taxationRegime).toBeUndefined();
    expect(dto.operatingLicense).toBeUndefined();
    expect(dto.licenseValidity).toBeUndefined();
    expect(dto.openingDate).toBeUndefined();
    expect(dto.status).toBeUndefined();
    expect(dto.blocked).toBeUndefined();
    expect(dto.mainCnae).toBeUndefined();
    expect(dto.secondaryCnae).toBeUndefined();
    expect(dto.fiscalResponsibleName).toBeUndefined();
    expect(dto.fiscalResponsibleCpf).toBeUndefined();
    expect(dto.fiscalResponsibleRne).toBeUndefined();
    expect(dto.hasDigitalCertificate).toBeUndefined();
    expect(dto.digitalCertificate).toBeUndefined();
    expect(dto.validatedDigitalCertificate).toBeUndefined();
    expect(dto.regularizationProcessNumber).toBeUndefined();
    expect(dto.fiscalObservations).toBeUndefined();
    expect(dto.createdBy).toBeUndefined();
  });
});
