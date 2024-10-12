import CompanyInputDTO from '../../../../../src/company/dtos/CompanyInputDTO.js';

describe('CompanyInputDTO', () => {
  it('should initialize with all provided company data', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Exemplo LTDA',
      cnpj: '12.345.678/0001-90',
      status: 'active',
      blocked: false
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBe(companyData.id);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.cnpj).toBe(companyData.cnpj);
    expect(dto.status).toBe(companyData.status);
    expect(dto.blocked).toBe(companyData.blocked);
  });

  it('should handle missing properties gracefully', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Exemplo LTDA',
      // cnpj: undefined, // Propriedade faltando
      status: 'active',
      blocked: false
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBe(companyData.id);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.cnpj).toBeUndefined(); // Deve ser undefined
    expect(dto.status).toBe(companyData.status);
    expect(dto.blocked).toBe(companyData.blocked);
  });

  it('should handle properties set to null', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Exemplo LTDA',
      cnpj: null, // Propriedade nula
      status: 'active',
      blocked: false
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBe(companyData.id);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.cnpj).toBeNull(); // Deve ser null
    expect(dto.status).toBe(companyData.status);
    expect(dto.blocked).toBe(companyData.blocked);
  });

  it('should initialize with default values for undefined properties', () => {
    const companyData = {
      id: undefined,
      corporateReason: undefined,
      cnpj: undefined,
      status: undefined,
      blocked: undefined
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBeUndefined(); // Deve ser undefined
    expect(dto.corporateReason).toBeUndefined(); // Deve ser undefined
    expect(dto.cnpj).toBeUndefined(); // Deve ser undefined
    expect(dto.status).toBeUndefined(); // Deve ser undefined
    expect(dto.blocked).toBeUndefined(); // Deve ser undefined
  });

  it('should handle incorrect data types', () => {
    const companyData = {
      id: '1', // Tipo incorreto (deveria ser um número)
      corporateReason: 12345, // Tipo incorreto (deveria ser uma string)
      cnpj: {}, // Tipo incorreto (deveria ser uma string)
      status: ['active'], // Tipo incorreto (deveria ser uma string)
      blocked: 'no' // Tipo incorreto (deveria ser um booleano)
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBe(companyData.id); // Deve ser uma string
    expect(dto.corporateReason).toBe(companyData.corporateReason); // Deve ser um número
    expect(dto.cnpj).toBe(companyData.cnpj); // Deve ser um objeto
    expect(dto.status).toBe(companyData.status); // Deve ser um array
    expect(dto.blocked).toBe(companyData.blocked); // Deve ser uma string
  });

  it('should create instance with partial data', () => {
    const companyData = {
      id: 1,
      corporateReason: 'Exemplo LTDA',
      // cnpj is missing
      // status is missing
      blocked: true
    };

    const dto = new CompanyInputDTO(companyData);

    expect(dto.id).toBe(companyData.id);
    expect(dto.corporateReason).toBe(companyData.corporateReason);
    expect(dto.cnpj).toBeUndefined(); // Deve ser undefined
    expect(dto.status).toBeUndefined(); // Deve ser undefined
    expect(dto.blocked).toBe(companyData.blocked);
  });
});
