// Importa o necessário para os testes
import { describe, it, expect, vi, afterEach } from 'vitest';
import UserCreateRepository from '../../../../../src/userOnly/repositories/UserCreate.js';
import dbService from '../../../../../src/config/dbService.js';

describe('UserCreateRepository', () => {
  // Mock da função de criação do dbService
  const mockUserData = {
    id: 1,
    email: 'test@example.com',
    userName: 'testUser',
    password: 'hashedPassword123',
    active: true,
    code: '123456'
  };

  const repository = new UserCreateRepository();

  // Zera o mock após cada teste
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um novo usuário com sucesso', async () => {
    // Mockando a função `dbService.user.create` para retornar mockUserData
    dbService.user.create = vi.fn().mockResolvedValue(mockUserData);

    const result = await repository.create(mockUserData);

    // Verifica se a função `dbService.user.create` foi chamada com os dados corretos
    expect(dbService.user.create).toHaveBeenCalledWith({ data: mockUserData });

    // Verifica se o resultado é o esperado
    expect(result).toEqual(mockUserData);
  });

  it('deve lançar um erro ao falhar na criação do usuário', async () => {
    // Mockando a função `dbService.user.create` para lançar um erro
    const errorMessage = 'Erro ao conectar ao banco de dados';
    dbService.user.create = vi.fn().mockRejectedValue(new Error(errorMessage));

    // Verifica se a função lança o erro correto
    await expect(repository.create(mockUserData)).rejects.toThrow(
      `Error creating user: ${errorMessage}`
    );

    // Verifica se a função `dbService.user.create` foi chamada com os dados corretos
    expect(dbService.user.create).toHaveBeenCalledWith({ data: mockUserData });
  });
});
