import { describe, it, expect, beforeEach, vi } from 'vitest';
import { userSchemaCreate } from '../../../../../src/userOnly/schemas/userShemaCreate.js';
import { userEmailValidate } from '../../../../../src/userOnly/constants/data/userEmail.js';
import { userNameValidate } from '../../../../../src/userOnly/constants/data/userName.js';
import { userPasswordValidate } from '../../../../../src/userOnly/constants/data/userPassword.js';

// Mock das funções de validação
vi.mock('../../../../../src/userOnly/constants/data/userEmail.js');
vi.mock('../../../../../src/userOnly/constants/data/userName.js');
vi.mock('../../../../../src/userOnly/constants/data/userPassword.js');

describe('userSchemaCreate', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it('deve retornar sucesso para dados válidos', () => {
    userEmailValidate.mockReturnValue({ valid: true });
    userNameValidate.mockReturnValue({ valid: true });
    userPasswordValidate.mockReturnValue({ valid: true });

    const userData = {
      email: 'usuario@exemplo.com',
      name: 'Nome do Usuário',
      password: 'Senha@123'
    };

    const result = userSchemaCreate(userData);

    expect(result).toEqual({ success: true });
  });

  it('deve retornar erro para e-mail inválido', () => {
    userEmailValidate.mockReturnValue({
      valid: false,
      errors: ['E-mail inválido.']
    });
    userNameValidate.mockReturnValue({ valid: true });
    userPasswordValidate.mockReturnValue({ valid: true });

    const userData = {
      email: 'usuario@exemplo.com',
      name: 'Nome do Usuário',
      password: 'Senha@123'
    };

    const result = userSchemaCreate(userData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['E-mail inválido.']
    });
  });

  it('deve retornar erro para nome inválido', () => {
    userEmailValidate.mockReturnValue({ valid: true });
    userNameValidate.mockReturnValue({
      valid: false,
      errors: ['Nome inválido.']
    });
    userPasswordValidate.mockReturnValue({ valid: true });

    const userData = {
      email: 'usuario@exemplo.com',
      name: 'Nome do Usuário',
      password: 'Senha@123'
    };

    const result = userSchemaCreate(userData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Nome inválido.']
    });
  });

  it('deve retornar erro para senha inválida', () => {
    userEmailValidate.mockReturnValue({ valid: true });
    userNameValidate.mockReturnValue({ valid: true });
    userPasswordValidate.mockReturnValue({
      valid: false,
      errors: ['Senha inválida.']
    });

    const userData = {
      email: 'usuario@exemplo.com',
      name: 'Nome do Usuário',
      password: 'Senha@123'
    };

    const result = userSchemaCreate(userData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['Senha inválida.']
    });
  });

  it('deve retornar erro para múltiplas validações falhas', () => {
    userEmailValidate.mockReturnValue({
      valid: false,
      errors: ['E-mail inválido.']
    });
    userNameValidate.mockReturnValue({
      valid: false,
      errors: ['Nome inválido.']
    });
    userPasswordValidate.mockReturnValue({
      valid: false,
      errors: ['Senha inválida.']
    });

    const userData = {
      email: 'usuario@exemplo.com',
      name: 'Nome do Usuário',
      password: 'Senha@123'
    };

    const result = userSchemaCreate(userData);

    expect(result).toEqual({
      statusCode: 400,
      messages: ['E-mail inválido.', 'Nome inválido.', 'Senha inválida.']
    });
  });
});
