// Importa o necessário para os testes
import { describe, it, expect, vi, afterEach } from 'vitest';
import UserCreateService from '../../../../../src/userOnly/services/UserCreate.js';
import UserCreateRepository from '../../../../../src/userOnly/repositories/UserCreate.js';
import UserInputFactory from '../../../../../src/userOnly/factories/UserInputFactory.js';
import Logger from '../../../../../src/shared/utils/Logger.js';

describe('UserCreateService', () => {
  // Mock para os dados do usuário
  const mockUserData = {
    id: 1,
    email: 'test@example.com',
    userName: 'testUser',
    password: 'hashedPassword123'
  };

  const mockUserCreated = {
    ...mockUserData,
    active: true,
    code: 123456
  };

  const mockUserDTO = {
    id: 1,
    email: 'test@example.com',
    userName: 'testUser',
    active: true,
    code: 123456
  };

  // Cria uma instância do serviço
  const userCreateService = new UserCreateService();

  // Zera os mocks após cada teste
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um usuário com sucesso', async () => {
    // Mock da função create no UserCreateRepository
    const createMock = vi
      .spyOn(UserCreateRepository.prototype, 'create')
      .mockResolvedValue(mockUserCreated);

    // Mock da função userInputDTO no UserInputFactory
    const userInputDTOMock = vi
      .spyOn(UserInputFactory, 'userInputDTO')
      .mockReturnValue(mockUserDTO);

    const result = await userCreateService.createUser(mockUserData);

    // Verifica se o repositório foi chamado com os dados corretos
    expect(createMock).toHaveBeenCalledWith({
      ...mockUserData,
      active: true,
      code: 123456
    });

    // Verifica se o DTO foi chamado com o usuário criado
    expect(userInputDTOMock).toHaveBeenCalledWith(mockUserCreated);

    // Verifica se o resultado é o esperado
    expect(result).toEqual({
      success: true,
      message: 'Usuário cadastrado com sucesso.',
      user: mockUserDTO
    });
  });

  it('deve retornar erro ao falhar na criação do usuário', async () => {
    // Mock para simular um erro no repositório
    const errorMessage = 'Erro ao criar usuário no banco de dados';
    const createMock = vi
      .spyOn(UserCreateRepository.prototype, 'create')
      .mockRejectedValue(new Error(errorMessage));

    // Mock da função Logger para verificar se o erro é logado
    const loggerMock = vi.spyOn(Logger, 'error');

    const result = await userCreateService.createUser(mockUserData);

    // Verifica se o repositório foi chamado com os dados corretos
    expect(createMock).toHaveBeenCalledWith({
      ...mockUserData,
      active: true,
      code: 123456
    });

    // Verifica se o erro foi logado
    expect(loggerMock).toHaveBeenCalledWith(new Error(errorMessage));

    // Verifica se o resultado de erro é o esperado
    expect(result).toEqual({
      success: false,
      message: 'Erro ao cadastrar usuário.'
    });
  });
});
