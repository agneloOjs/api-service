// CompanyGetAllRepository.test.js
import { describe, it, expect, vi } from 'vitest';
import CompanyGetAllRepository from '../../../../../src/company/repositories/CompanyGetAll.js';
import dbService from '../../../../../src/config/dbService.js';

describe('CompanyGetAllRepository', () => {
  const companyGetAllRepository = new CompanyGetAllRepository();

  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    vi.resetAllMocks();
  });

  it('should return all companies successfully', async () => {
    const companies = [
      { id: 1, name: 'Company One' },
      { id: 2, name: 'Company Two' }
    ];

    // Mock do método findMany do dbService
    vi.spyOn(dbService.company, 'findMany').mockResolvedValue(companies);

    const result = await companyGetAllRepository.companyFindAll();

    expect(dbService.company.findMany).toHaveBeenCalled(); // Verifica se o método foi chamado
    expect(result).toEqual(companies); // Verifica se o resultado é o esperado
  });

  it('should handle errors when fetching companies', async () => {
    // Mock do método findMany do dbService para lançar um erro
    vi.spyOn(dbService.company, 'findMany').mockRejectedValue(
      new Error('Database error')
    );

    await expect(companyGetAllRepository.companyFindAll()).rejects.toThrow(
      'Database error'
    );
    expect(dbService.company.findMany).toHaveBeenCalled(); // Verifica se o método foi chamado
  });
});
