// Importa o necessário para os testes
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userSchemaCreate } from '../../../../../src/userOnly/schemas/userShemaCreate.js';

// Mocks para as funções de validação
vi.mock('../../../../../src/userOnly/constants/data/userEmail.js', () => ({
  userEmailValidate: vi.fn()
}));

vi.mock('../../../../../src/userOnly/constants/data/userName.js', () => ({
  userNameValidate: vi.fn()
}));

vi.mock('../../../../../src/userOnly/constants/data/userPassword.js', () => ({
  userPasswordValidate: vi.fn()
}));

import { userEmailValidate } from '../../../../../src/userOnly/constants/data/userEmail.js';
import { userNameValidate } from '../../../../../src/userOnly/constants/data/userName.js';
import { userPasswordValidate } from '../../../../../src/userOnly/constants/data/userPassword.js';

describe('userSchemaCreate', () => {
  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    vi.clearAllMocks();
  });

  it('deve retornar sucesso para dados válidos', () => {
    const validUserData = {
      email: 'valid@example.com',
      userName: 'validUser',
      password: 'StrongPassword123!'
    };

    userEmailValidate.mockReturnValue({ valid: true, errors: [] });
    userNameValidate.mockReturnValue({ valid: true, errors: [] });
    userPasswordValidate.mockReturnValue({ valid: true, errors: [] });

    const result = userSchemaCreate(validUserData);

    expect(result).toEqual({
      statusCode: 200,
      success: true
    });
  });

  it('deve retornar erro para e-mail inválido', () => {
    const invalidUserData = {
      email: 'invalid-email',
      userName: 'validUser',
      password: 'StrongPassword123!'
    };

    userEmailValidate.mockReturnValue({
      valid: false,
      errors: ['Email inválido.']
    });
    userNameValidate.mockReturnValue({ valid: true, errors: [] });
    userPasswordValidate.mockReturnValue({ valid: true, errors: [] });

    const result = userSchemaCreate(invalidUserData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Email inválido.']
    });
  });

  it('deve retornar erro para nome inválido', () => {
    const invalidUserData = {
      email: 'valid@example.com',
      userName: '',
      password: 'StrongPassword123!'
    };

    userEmailValidate.mockReturnValue({ valid: true, errors: [] });
    userNameValidate.mockReturnValue({
      valid: false,
      errors: ['Nome é obrigatório.']
    });
    userPasswordValidate.mockReturnValue({ valid: true, errors: [] });

    const result = userSchemaCreate(invalidUserData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Nome é obrigatório.']
    });
  });

  it('deve retornar erro para senha inválida', () => {
    const invalidUserData = {
      email: 'valid@example.com',
      userName: 'validUser',
      password: '123'
    };

    userEmailValidate.mockReturnValue({ valid: true, errors: [] });
    userNameValidate.mockReturnValue({ valid: true, errors: [] });
    userPasswordValidate.mockReturnValue({
      valid: false,
      errors: ['Senha muito fraca.']
    });

    const result = userSchemaCreate(invalidUserData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Senha muito fraca.']
    });
  });

  it('deve retornar erro para múltiplos campos inválidos', () => {
    const invalidUserData = {
      email: 'invalid-email',
      userName: '',
      password: '123'
    };

    userEmailValidate.mockReturnValue({
      valid: false,
      errors: ['Email inválido.']
    });
    userNameValidate.mockReturnValue({
      valid: false,
      errors: ['Nome é obrigatório.']
    });
    userPasswordValidate.mockReturnValue({
      valid: false,
      errors: ['Senha muito fraca.']
    });

    const result = userSchemaCreate(invalidUserData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Email inválido.']
    });
  });
});
