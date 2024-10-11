import { describe, it, expect } from 'vitest';
import {
  I18nCompanyBR,
  ERROR_COMPANY,
  SUCCESS_COMPANY
} from '../../../../../../src/I18n/pt-BR/models/I18nCompanyBR.js';

describe('I18nCompanyBR', () => {
  it('deve ter todas as chaves definidas', () => {
    const expectedKeys = [
      'companyCnpj',
      'companyEmail',
      'companyCcreatedAt',
      'companyUpdatedAt',
      'companyfantasyName',
      'companyCorporateReason',
      'companyStateRegistration',
      'companyMunicipalRegistration',
      'companyFiscalResponsibleName',
      'companyFiscalResponsibleCpf',
      'companyRegularizationProcessNumber',
      'companyValidatedDigitalCertificate',
      'companyHasDigitalCertificate',
      'companyFiscalObservations',
      'companyOperatingLicense',
      'companyLicenseValidity',
      'companyTaxationRegime',
      'companyOpeningDate',
      'companyCreatedBy',
      'companyBlocked',
      'companyStatus',
      'companyCnae'
    ];

    expectedKeys.forEach((key) => {
      expect(I18nCompanyBR).toHaveProperty(key);
    });
  });

  it('deve ter valores corretos para cada chave', () => {
    expect(I18nCompanyBR.companyCnpj).toBe('CNPJ');
    expect(I18nCompanyBR.companyEmail).toBe('E-mail');
    expect(I18nCompanyBR.companyCcreatedAt).toBe('Criado Em');
    expect(I18nCompanyBR.companyUpdatedAt).toBe('AtualizadoEm');
    expect(I18nCompanyBR.companyfantasyName).toBe('Nome Fantasia');
    expect(I18nCompanyBR.companyCorporateReason).toBe('Razão Social');
    expect(I18nCompanyBR.companyStateRegistration).toBe('Registro Estadual');
    expect(I18nCompanyBR.companyMunicipalRegistration).toBe(
      'Cadastro Municipal'
    );
    expect(I18nCompanyBR.companyFiscalResponsibleName).toBe(
      'Nome Responsável Fiscal'
    );
    expect(I18nCompanyBR.companyFiscalResponsibleCpf).toBe(
      'CPF do Responsável Fiscal'
    );
    expect(I18nCompanyBR.companyRegularizationProcessNumber).toBe(
      'N. do Processo de Regularização'
    );
    expect(I18nCompanyBR.companyValidatedDigitalCertificate).toBe(
      'Validade do Certificado Digital'
    );
    expect(I18nCompanyBR.companyHasDigitalCertificate).toBe(
      'Certificado Digital:'
    );
    expect(I18nCompanyBR.companyFiscalObservations).toBe('Observações Fiscais');
    expect(I18nCompanyBR.companyOperatingLicense).toBe('Licença Operacional');
    expect(I18nCompanyBR.companyLicenseValidity).toBe('Validade da licença');
    expect(I18nCompanyBR.companyTaxationRegime).toBe('Regime Tributário');
    expect(I18nCompanyBR.companyOpeningDate).toBe('Data de abertura');
    expect(I18nCompanyBR.companyCreatedBy).toBe('Criado por');
    expect(I18nCompanyBR.companyBlocked).toBe('Bloqueado');
    expect(I18nCompanyBR.companyStatus).toBe('Status');
    expect(I18nCompanyBR.companyCnae).toBe('CNAE');
  });
});

describe('ERROR_COMPANY', () => {
  it('deve ter mensagens de erro corretas', () => {
    expect(ERROR_COMPANY.NOT_FOUND).toBe('Empresa não encontrada.');
    expect(ERROR_COMPANY.DOES_NOT_EXIST).toBe('A empresa não existe.');
    expect(ERROR_COMPANY.NOT_FOUND_ALL).toBe('Erro ao listar empresas.');
    expect(ERROR_COMPANY.ERROR_CREATED).toBe('Erro ao cadastrar empresa.');
  });
});

describe('SUCCESS_COMPANY', () => {
  it('deve ter mensagens de sucesso corretas', () => {
    expect(SUCCESS_COMPANY.CREATED_OK).toBe('Empresa cadastrada com sucesso.');
    expect(SUCCESS_COMPANY.LIST_ALL).toBe('Empresas listadas com sucesso.');
    expect(SUCCESS_COMPANY.LIST_UNIQUE).toBe('Empresa listada com sucesso.');
  });
});
