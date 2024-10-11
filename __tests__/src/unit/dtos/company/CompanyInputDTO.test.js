import { describe, it, expect } from 'vitest';
import CompanyInputDTO from '../../../../../src/dtos/company/CompanyInputDTO.js';

describe('CompanyInputDTO', () => {
  it('deve inicializar corretamente com os dados fornecidos', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Empresa Exemplo Ltda',
      cnpj: '12.345.678/0001-99',
      status: 'Ativo',
      blocked: false
    };

    const companyDTO = new CompanyInputDTO(companyData);

    expect(companyDTO.id).toBe(1);
    expect(companyDTO.corporateReason).toBe('Empresa Exemplo Ltda');
    expect(companyDTO.cnpj).toBe('12.345.678/0001-99');
    expect(companyDTO.status).toBe('Ativo');
    expect(companyDTO.blocked).toBe(false);
  });

  it('deve inicializar corretamente quando campos opcionais não forem fornecidos', () => {
    const companyData = {
      id: 2,
      corporateReason: 'Empresa Exemplo 2',
      cnpj: '98.765.432/0001-55'
      // status e blocked não foram fornecidos
    };

    const companyDTO = new CompanyInputDTO(companyData);

    expect(companyDTO.id).toBe(2);
    expect(companyDTO.corporateReason).toBe('Empresa Exemplo 2');
    expect(companyDTO.cnpj).toBe('98.765.432/0001-55');
    expect(companyDTO.status).toBeUndefined();
    expect(companyDTO.blocked).toBeUndefined();
  });

  it('deve retornar undefined para campos que não existem no objeto de entrada', () => {
    const companyData = {
      id: 3,
      corporateReason: 'Empresa Exemplo 3',
      cnpj: '11.111.111/1111-11'
    };

    const companyDTO = new CompanyInputDTO(companyData);

    expect(companyDTO.status).toBeUndefined();
    expect(companyDTO.blocked).toBeUndefined();
  });
});
