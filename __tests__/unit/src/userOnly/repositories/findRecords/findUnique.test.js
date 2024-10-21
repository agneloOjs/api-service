import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserfindUniqueRepository } from '../../../../../../src/userOnly/repositories/findRecords/findUnique.js';
import dbService from '../../../../../../src/config/dbService.js';

describe('FindUniqueRepository', () => {
  let repository;

  beforeEach(() => {
    repository = new UserfindUniqueRepository();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Limpa os mocks entre os testes
  });

  it('deve buscar um usuário pelo id', async () => {
    const mockUser = { id: 1, name: 'John Doe' };

    // Mock da função findUnique para o caso de busca por id
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(mockUser);

    const result = await repository.findById(1);

    expect(result).toEqual(mockUser);
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 }
    });
  });

  it('deve buscar um usuário pelo email', async () => {
    const mockUser = { id: 1, email: 'john@example.com' };

    // Mock da função findUnique para o caso de busca por email
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(mockUser);

    const result = await repository.findByEmail('john@example.com');

    expect(result).toEqual(mockUser);
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'john@example.com' }
    });
  });

  it('deve buscar um usuário pelo código', async () => {
    const mockUser = { id: 1, code: '123456' };

    // Mock da função findUnique para o caso de busca por código
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(mockUser);

    const result = await repository.findByCode('123456');

    expect(result).toEqual(mockUser);
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { code: '123456' }
    });
  });

  it('deve retornar null se o usuário não for encontrado pelo id', async () => {
    // Mock que retorna null para simular que o usuário não foi encontrado
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(null);

    const result = await repository.findById(999);

    expect(result).toBeNull();
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 999 }
    });
  });

  it('deve retornar null se o usuário não for encontrado pelo email', async () => {
    // Mock que retorna null para simular que o usuário não foi encontrado
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(null);

    const result = await repository.findByEmail('nonexistent@example.com');

    expect(result).toBeNull();
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'nonexistent@example.com' }
    });
  });

  it('deve retornar null se o usuário não for encontrado pelo código', async () => {
    // Mock que retorna null para simular que o usuário não foi encontrado
    vi.spyOn(dbService.user, 'findUnique').mockResolvedValueOnce(null);

    const result = await repository.findByCode('000000');

    expect(result).toBeNull();
    expect(dbService.user.findUnique).toHaveBeenCalledWith({
      where: { code: '000000' }
    });
  });
});
