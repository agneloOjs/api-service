import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserCreateService from '../../../../../src/userOnly/services/UserCreate.js';
import UserCreateRepository from '../../../../../src/userOnly/repositories/UserCreate.js';
import { userSchemaCreate } from '../../../../../src/userOnly/schemas/userShemaCreate.js';
import { userGenerateCode } from '../../../../../src/userOnly/utils/generateCode.js';
import { passwordEncrypt } from '../../../../../src/userOnly/utils/passwordEncrypt.js';
import { I18n_USER_MESSAGE } from '../../../../../src/userOnly/I18n/pt-BR/UserModel.js';
import Logger from '../../../../../src/shared/utils/Logger.js';

// Mocks
vi.mock('../../../../../src/userOnly/repositories/UserCreate.js');
vi.mock('../../../../../src/userOnly/utils/generateCode.js');
vi.mock('../../../../../src/userOnly/schemas/userShemaCreate.js');
vi.mock('../../../../../src/userOnly/utils/passwordEncrypt.js');
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

  it('deve criar um usuário com sucesso e criptografar a senha', async () => {
    const userCode = '123456';
    const encryptedPassword = 'hashedPassword';

    userGenerateCode.mockResolvedValue(userCode);
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    passwordEncrypt.mockResolvedValue(encryptedPassword);
    UserCreateRepository.prototype.create.mockResolvedValue({
      ...mockUserData,
      password: encryptedPassword
    });

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: true,
      message: `${I18n_USER_MESSAGE.USER_CREATE_SUCCESS}`,
      user: { ...mockUserData, password: encryptedPassword }
    });
    expect(passwordEncrypt).toHaveBeenCalledWith(mockUserData.password);
    expect(UserCreateRepository.prototype.create).toHaveBeenCalledWith({
      ...mockUserData,
      active: true,
      code: userCode,
      password: encryptedPassword
    });
  });

  it('deve retornar um erro se a criptografia da senha falhar', async () => {
    const errorMessage = 'Erro na criptografia';

    // Mocks
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    passwordEncrypt.mockRejectedValue(new Error(errorMessage));

    try {
      await userCreateService.createUser(mockUserData);
    } catch (error) {
      // Verificações
      expect(error.message).toBe(errorMessage);
      expect(passwordEncrypt).toHaveBeenCalledWith(mockUserData.password);
      expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
    }
  });

  it('deve retornar mensagem de erro se a geração do código do usuário falhar', async () => {
    const errorMessage = 'Erro na geração do código';

    // Mocks
    userGenerateCode.mockRejectedValue(new Error(errorMessage));
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    passwordEncrypt.mockResolvedValue('hashedPassword');

    try {
      await userCreateService.createUser(mockUserData);
    } catch (error) {
      // Verificações
      expect(error.message).toBe(errorMessage);
      expect(userGenerateCode).toHaveBeenCalled();
      expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
    }
  });

  it('deve retornar mensagem de erro se a geração do código do usuário falhar', async () => {
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    userGenerateCode.mockRejectedValue(new Error('Erro na geração do código'));

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: false,
      message: `${I18n_USER_MESSAGE.USER_CREATE_ERROR}`
    });
    expect(UserCreateRepository.prototype.create).not.toHaveBeenCalled();
  });

  it('deve retornar mensagem de erro se a criação do usuário falhar', async () => {
    const errorMessage = 'Erro ao criar usuário';
    userGenerateCode.mockResolvedValue('123456');
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    passwordEncrypt.mockResolvedValue('hashedPassword');
    UserCreateRepository.prototype.create.mockRejectedValue(
      new Error(errorMessage)
    );

    const result = await userCreateService.createUser(mockUserData);

    expect(result).toEqual({
      success: false,
      message: `${I18n_USER_MESSAGE.USER_CREATE_ERROR}`
    });
    expect(Logger.error).toHaveBeenCalledWith(expect.any(Error));
  });

  it('deve registrar o erro quando a criação do usuário falha', async () => {
    const errorMessage = 'Erro no banco de dados';
    userGenerateCode.mockResolvedValue('123456');
    userSchemaCreate.mockReturnValue({ statusCode: 200 });
    passwordEncrypt.mockResolvedValue('hashedPassword');
    UserCreateRepository.prototype.create.mockRejectedValue(
      new Error(errorMessage)
    );

    await userCreateService.createUser(mockUserData);

    expect(Logger.error).toHaveBeenCalled();
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
