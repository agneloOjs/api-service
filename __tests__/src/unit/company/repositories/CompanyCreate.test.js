import { describe, it, expect, vi } from 'vitest';
import CompanyCreateRepository from '../../../../../src/company/repositories/CompanyCreate.js';
import dbService from '../../../../../src/config/dbService.js';

describe('CompanyCreateRepository', () => {
  const companyCreateRepository = new CompanyCreateRepository();

  beforeEach(() => {
    // Resetar o mock antes de cada teste
    vi.resetAllMocks();
  });

  it('should create a company successfully', async () => {
    const companyData = {
      email: 'test@company.com',
      corporateReason: 'Test Corp',
      cnpj: '12.345.678/0001-01',
      status: 'active',
      blocked: false
    };

    const createdCompany = {
      id: 1,
      ...companyData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Mock do método create do dbService
    vi.spyOn(dbService.company, 'create').mockResolvedValue(createdCompany);

    const result = await companyCreateRepository.create(companyData);

    expect(dbService.company.create).toHaveBeenCalledWith({
      data: companyData
    });
    expect(result).toEqual(createdCompany);
  });

  it('should handle errors during company creation', async () => {
    const companyData = {
      email: 'test@company.com',
      corporateReason: 'Test Corp',
      cnpj: '12.345.678/0001-01',
      status: 'active',
      blocked: false
    };

    // Mock do método create do dbService para lançar um erro
    vi.spyOn(dbService.company, 'create').mockRejectedValue(
      new Error('Database error')
    );

    await expect(companyCreateRepository.create(companyData)).rejects.toThrow(
      'Database error'
    );
    expect(dbService.company.create).toHaveBeenCalledWith({
      data: companyData
    });
  });

  it('should throw an error if companyData is invalid', async () => {
    // Teste com dados inválidos
    const invalidCompanyData = null; // ou qualquer outro dado inválido

    await expect(
      companyCreateRepository.create(invalidCompanyData)
    ).rejects.toThrow();
    expect(dbService.company.create).not.toHaveBeenCalled(); // Não deve ser chamado
  });
});
