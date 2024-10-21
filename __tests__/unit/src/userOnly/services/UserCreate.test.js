import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserCreateService from '../../../../../src/userOnly/services/UserCreate.js';
import UserCreateRepository from '../../../../../src/userOnly/repositories/UserCreate.js';
import { userSchemaCreate } from '../../../../../src/userOnly/schemas/userShemaCreate.js';
import { userGenerateCode } from '../../../../../src/userOnly/utils/generateCode.js';
import { I18n_USER_MESSAGE } from '../../../../../src/userOnly/I18n/pt-BR/UserModel.js';
import Logger from '../../../../../src/shared/utils/Logger.js';

// Mocks
vi.mock('../../../../../src/userOnly/repositories/UserCreate.js');
vi.mock('../../../../../src/userOnly/utils/generateCode.js');
vi.mock('../../../../../src/userOnly/schemas/userShemaCreate.js');
vi.mock('../../../../../src/shared/utils/Logger.js');

describe('UserCreateService', () => {
  let userCreateService;
  const mockUserData = {
    userName: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123'
  };

  beforeEach(() => {
    userCreateService = new UserCreateService();
    vi.clearAllMocks();
  });

  it('deve criar um usuário com sucesso', async () => {
    const userCode = '123456';
    userGenerateCode.mockResolvedValue(userCode);
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    UserCreateRepository.prototype.create.mockResolvedValue(mockUserData);

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: true,
      message: I18n_USER_MESSAGE.USER_CREATE_SUCCESS,
      user: mockUserData // Assegure-se de que o formato do retorno está correto
    });
    expect(UserCreateRepository.prototype.create).toHaveBeenCalledWith({
      ...mockUserData,
      active: true,
      code: userCode
    });
  });

  it('deve retornar mensagem de erro de validação se a validação falhar', async () => {
    userSchemaCreate.mockReturnValue({
      statusCode: 400,
      messages: ['Dados do usuário inválidos']
    });

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: false,
      message: 'Dados do usuário inválidos'
    });
    expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
  });

  it('deve retornar mensagem de erro se a geração do código do usuário falhar', async () => {
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    userGenerateCode.mockRejectedValue(new Error('Erro na geração do código'));

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: false,
      message: I18n_USER_MESSAGE.USER_CREATE_ERROR
    });
    expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
  });

  it('deve retornar mensagem de erro se a criação do usuário falhar', async () => {
    const errorMessage = 'Erro na geração do código';
    userGenerateCode.mockResolvedValue('123456');
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    UserCreateRepository.prototype.create.mockRejectedValue(
      new Error(errorMessage)
    );

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: false,
      message: I18n_USER_MESSAGE.USER_CREATE_ERROR
    });
    expect(Logger.error).toHaveBeenCalledWith(expect.any(Error)); // Verifica se o logger registrou o erro
  });

  it('deve registrar o erro quando a criação do usuário falha', async () => {
    const errorMessage = 'Erro no banco de dados';
    userGenerateCode.mockResolvedValue('123456');
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    UserCreateRepository.prototype.create.mockRejectedValue(
      new Error(errorMessage)
    );

    await userCreateService.createUser(mockUserData);

    expect(Logger.error).toHaveBeenCalled(); // Verifica se o Logger foi chamado
  });

  it('deve tratar o caso de dados do usuário vazios', async () => {
    const emptyUserData = {};
    userSchemaCreate.mockReturnValue({
      statusCode: 400,
      messages: ['Os dados do usuário não podem estar vazios']
    });

    const result = await userCreateService.createUser(emptyUserData);

    expect(result).toEqual({
      success: false,
      message: 'Os dados do usuário não podem estar vazios'
    });
    expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
  });
});
