import { describe, it, expect } from 'vitest';
import CompanyInputDTO from '../../../../../src/dtos/company/CompanyInputDTO.js';
import CompanyInputFectory from '../../../../../src/factories/company/CompanyInputFactory.js';

describe('CompanyInputFactory', () => {
  it('deve criar uma instância de CompanyInputDTO com os dados fornecidos', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Empresa Exemplo Ltda',
      cnpj: '12.345.678/0001-99',
      status: true,
      blocked: false
    };

    const companyDTO = CompanyInputFectory.companyInputDTO(companyData);

    expect(companyDTO).toBeInstanceOf(CompanyInputDTO);
    expect(companyDTO.id).toBe(1);
    expect(companyDTO.corporateReason).toBe('Empresa Exemplo Ltda');
    expect(companyDTO.cnpj).toBe('12.345.678/0001-99');
    expect(companyDTO.status).toBe(true);
    expect(companyDTO.blocked).toBe(false);
  });

  it('deve retornar undefined para campos que não existem no objeto de entrada', () => {
    const companyData = {
      id: 2,
      corporateReason: 'Empresa Exemplo 2',
      cnpj: '98.765.432/0001-55'
    };

    const companyDTO = CompanyInputFectory.companyInputDTO(companyData);

    expect(companyDTO.status).toBeUndefined();
    expect(companyDTO.blocked).toBeUndefined();
  });
});
