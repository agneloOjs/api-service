import { describe, it, expect } from 'vitest';
import { CompanyValidateCNPJ } from '../../../../../../../src/validators/schemas/company/data/CompanyCNPJ.js';
import { VALIDATE_INPUT_DATA_COMPANY } from '../../../../../../../src/I18n/pt-BR/models/I18nCompanyBR.js';

describe('CompanyValidateCNPJ', () => {
  it('deve retornar true para um CNPJ válido', () => {
    const validCNPJ = '11222333000181';
    expect(CompanyValidateCNPJ(validCNPJ)).toBe(true);
  });

  it('deve retornar a mensagem de CNPJ inválido para um CNPJ incorreto', () => {
    const invalidCNPJ = '11222333000182';
    expect(CompanyValidateCNPJ(invalidCNPJ)).toBe(
      VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID
    );
  });

  it('deve retornar a mensagem "CNPJ deve ter 14 dígitos" se o CNPJ tiver menos de 14 dígitos', () => {
    const shortCNPJ = '11222333000';
    expect(CompanyValidateCNPJ(shortCNPJ)).toBe(
      VALIDATE_INPUT_DATA_COMPANY.CNPJ_LENGTH
    );
  });

  it('deve retornar a mensagem de CNPJ inválido para um CNPJ com todos os números iguais', () => {
    const repeatedCNPJ = '11111111111111';
    expect(CompanyValidateCNPJ(repeatedCNPJ)).toBe(
      VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID
    );
  });

  it('deve retornar true se o CNPJ contiver caracteres não numéricos mas for válido', () => {
    const cnpjWithInvalidChars = '11.222.333/0001-81';
    expect(CompanyValidateCNPJ(cnpjWithInvalidChars)).toBe(true);
  });
});
