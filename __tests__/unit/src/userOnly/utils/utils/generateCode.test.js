import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { userGenerateCode } from '../../../../../../src/userOnly/utils/generateCode.js';
import { UserfindUniqueRepository } from '../../../../../../src/userOnly/repositories/findRecords/findUnique.js';

// Mock da classe UserfindUniqueRepository
vi.mock(
  '../../../../../../src/userOnly/repositories/findRecords/findUnique.js'
);

describe('userGenerateCode', () => {
  let mockFindByCode;

  beforeEach(() => {
    // Reseta o mock antes de cada teste
    mockFindByCode = vi.fn();
    UserfindUniqueRepository.mockImplementation(() => ({
      findByCode: mockFindByCode
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve gerar um código único na primeira tentativa', async () => {
    // Simula que nenhum código já existe no banco
    mockFindByCode.mockResolvedValue(null);

    const uniqueCode = await userGenerateCode();

    // Verifica se o código gerado está no intervalo correto
    expect(uniqueCode).toBeGreaterThanOrEqual(100000);
    expect(uniqueCode).toBeLessThanOrEqual(999999);

    // Verifica se a função findByCode foi chamada uma vez
    expect(mockFindByCode).toHaveBeenCalledTimes(1);
  });

  it('deve gerar um código único após algumas tentativas', async () => {
    // Simula que o código gerado já existe em duas tentativas, mas na terceira tentativa o código é único
    mockFindByCode
      .mockResolvedValueOnce({ code: 123456 })
      .mockResolvedValueOnce({ code: 654321 })
      .mockResolvedValueOnce(null);

    const uniqueCode = await userGenerateCode();

    // Verifica se o código gerado está no intervalo correto
    expect(uniqueCode).toBeGreaterThanOrEqual(100000);
    expect(uniqueCode).toBeLessThanOrEqual(999999);

    // Verifica se a função findByCode foi chamada três vezes
    expect(mockFindByCode).toHaveBeenCalledTimes(3);
  });

  it('deve falhar ao tentar gerar um código único após o número máximo de tentativas', async () => {
    // Simula que todos os códigos gerados já existem no banco de dados
    mockFindByCode.mockResolvedValue({ code: 123456 });

    // Espera que a função lance um erro após atingir o número máximo de tentativas
    await expect(userGenerateCode()).rejects.toThrow(
      'Não foi possível gerar um código único após 10 tentativas.'
    );

    // Verifica se a função findByCode foi chamada 10 vezes
    expect(mockFindByCode).toHaveBeenCalledTimes(10);
  });
});
