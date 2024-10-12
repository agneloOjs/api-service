// CompanyResFactory.test.js
import { describe, it, expect } from 'vitest';
import CompanyResDTO from '../../../../../src/company/dtos/CompanyResDTO.js';
import CompanyResFactory from '../../../../../src/company/factories/CompanyResFectory.js';

describe('CompanyResFactory', () => {
  it('should create an array of CompanyResDTO from valid company data', () => {
    const companiesData = [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'test1@company.com',
        corporateReason: 'Test Corp 1',
        cnpj: '12.345.678/0001-01',
        status: 'active',
        blocked: false
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'test2@company.com',
        corporateReason: 'Test Corp 2',
        cnpj: '12.345.678/0001-02',
        status: 'inactive',
        blocked: true
      }
    ];

    const dtos = CompanyResFactory.companyResDTO(companiesData);

    expect(dtos).toHaveLength(2);
    expect(dtos[0]).toBeInstanceOf(CompanyResDTO);
    expect(dtos[1]).toBeInstanceOf(CompanyResDTO);
    expect(dtos[0].id).toBe(companiesData[0].id);
    expect(dtos[0].corporateReason).toBe(companiesData[0].corporateReason);
    expect(dtos[1].id).toBe(companiesData[1].id);
    expect(dtos[1].corporateReason).toBe(companiesData[1].corporateReason);
  });

  it('should return an empty array if input is an empty array', () => {
    const dtos = CompanyResFactory.companyResDTO([]);

    expect(dtos).toHaveLength(0);
  });

  it('should handle companies with missing properties', () => {
    const companiesData = [
      {
        id: 1,
        email: 'test@company.com',
        corporateReason: 'Test Corp 1'
      },
      {
        id: 2,
        cnpj: '12.345.678/0001-02',
        status: 'inactive'
      }
    ];

    const dtos = CompanyResFactory.companyResDTO(companiesData);

    expect(dtos).toHaveLength(2);
    expect(dtos[0].id).toBe(companiesData[0].id);
    expect(dtos[0].email).toBe(companiesData[0].email);
    expect(dtos[0].corporateReason).toBe(companiesData[0].corporateReason);
    expect(dtos[0].cnpj).toBeUndefined();
    expect(dtos[1].id).toBe(companiesData[1].id);
    expect(dtos[1].cnpj).toBe(companiesData[1].cnpj);
    expect(dtos[1].status).toBe(companiesData[1].status);
    expect(dtos[1].email).toBeUndefined();
  });

  it('should throw an error if the input is not an array', () => {
    expect(() => CompanyResFactory.companyResDTO(null)).toThrow();
    expect(() => CompanyResFactory.companyResDTO('invalid data')).toThrow();
    expect(() => CompanyResFactory.companyResDTO(123)).toThrow();
    expect(() => CompanyResFactory.companyResDTO({})).toThrow();
  });
});
