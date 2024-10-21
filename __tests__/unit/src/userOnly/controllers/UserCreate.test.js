import { describe, it, expect, vi, afterEach } from 'vitest';
import UserCreateController from '../../../../../src/userOnly/controllers/UserCreate.js';
import UserCreateService from '../../../../../src/userOnly/services/UserCreate.js';
import Logger from '../../../../../src/shared/utils/Logger.js';

describe('UserCreateController', () => {
  // Mock dos objetos req e res
  const mockReq = {
    body: {
      email: 'test@example.com',
      userName: 'testUser',
      password: 'hashedPassword123'
    }
  };

  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };

  const userCreateController = new UserCreateController();

  // Zera os mocks após cada teste
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um usuário com sucesso e retornar status 201', async () => {
    // Mock para simular a criação bem-sucedida do usuário
    const mockNewUser = {
      success: true,
      message: 'Usuário cadastrado com sucesso.',
      user: {
        id: 1,
        email: 'test@example.com',
        userName: 'testUser',
        active: true,
        code: 123456
      }
    };

    // Mock da função createUser no UserCreateService
    const createUserMock = vi
      .spyOn(UserCreateService.prototype, 'createUser')
      .mockResolvedValue(mockNewUser);

    await userCreateController.create(mockReq, mockRes);

    // Verifica se o serviço foi chamado com os dados corretos
    expect(createUserMock).toHaveBeenCalledWith(mockReq.body);

    // Verifica se a resposta HTTP foi 201 e o JSON retornado corretamente
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockNewUser);
  });

  it('deve retornar status 400 e mensagem de erro quando a criação do usuário falhar', async () => {
    // Mock para simular a falha na criação do usuário
    const mockNewUser = {
      success: false,
      message: 'Erro ao cadastrar usuário.'
    };

    // Mock da função createUser no UserCreateService para falha
    const createUserMock = vi
      .spyOn(UserCreateService.prototype, 'createUser')
      .mockResolvedValue(mockNewUser);

    await userCreateController.create(mockReq, mockRes);

    // Verifica se o serviço foi chamado com os dados corretos
    expect(createUserMock).toHaveBeenCalledWith(mockReq.body);

    // Verifica se a resposta HTTP foi 400 e a mensagem de erro retornada
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: mockNewUser.message });
  });

  it('deve retornar status 500 e logar o erro em caso de exceção no servidor', async () => {
    // Mock para simular uma exceção no serviço
    const errorMessage = 'Erro no servidor.';
    const createUserMock = vi
      .spyOn(UserCreateService.prototype, 'createUser')
      .mockRejectedValue(new Error(errorMessage));

    // Mock da função Logger para verificar se o erro é logado
    const loggerMock = vi.spyOn(Logger, 'error');

    await userCreateController.create(mockReq, mockRes);

    // Verifica se o serviço foi chamado com os dados corretos
    expect(createUserMock).toHaveBeenCalledWith(mockReq.body);

    // Verifica se o erro foi logado corretamente
    expect(loggerMock).toHaveBeenCalledWith(new Error(errorMessage));

    // Verifica se a resposta HTTP foi 500 e a mensagem de erro retornada
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro no servidor.' });
  });
});
