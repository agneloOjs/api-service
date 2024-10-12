import { describe, it, expect } from 'vitest';
import CompanyInputDTO from '../../../../../src/company/dtos/CompanyInputDTO.js';
import CompanyInputFectory from '../../../../../src/company/factories/CompanyInputFactory.js';

describe('CompanyInputFectory', () => {
  it('should create a CompanyInputDTO from valid company data', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Test Corp',
      cnpj: '12.345.678/0001-90',
      status: 'active',
      blocked: false
    };

    const dto = CompanyInputFectory.companyInputDTO(companyData);

    expect(dto).toBeInstanceOf(CompanyInputDTO);
    expect(dto.id).toBe(companyData.id);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.cnpj).toBe(companyData.cnpj);
    expect(dto.status).toBe(companyData.status);
    expect(dto.blocked).toBe(companyData.blocked);
  });

  it('should create a CompanyInputDTO with undefined properties if data is missing', () => {
    const companyData = {};
    const dto = CompanyInputFectory.companyInputDTO(companyData);

    expect(dto).toBeInstanceOf(CompanyInputDTO);
    expect(dto.id).toBeUndefined();
    expect(dto.corporateReason).toBeUndefined();
    expect(dto.cnpj).toBeUndefined();
    expect(dto.status).toBeUndefined();
    expect(dto.blocked).toBeUndefined();
  });

  it('should throw an error if the input is not an object', () => {
    expect(() => CompanyInputFectory.companyInputDTO(null)).toThrow();
    expect(() => CompanyInputFectory.companyInputDTO('invalid data')).toThrow();
    expect(() => CompanyInputFectory.companyInputDTO(123)).toThrow();
  });
});
