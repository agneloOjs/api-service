import {
  I18nUserModelBR,
  I18n_USER_MESSAGE
} from '../../../../../src/userOnly/I18n/pt-BR/UserModel.js';
import { describe, it, expect } from 'vitest';

// Testes para I18nUserModelBR
describe('I18nUserModelBR', () => {
  it('deve ter todas as propriedades esperadas', () => {
    expect(I18nUserModelBR).toHaveProperty('id', 'id');
    expect(I18nUserModelBR).toHaveProperty('createdAt', 'Criado em');
    expect(I18nUserModelBR).toHaveProperty('updatedAt', 'Atualizado em');
    expect(I18nUserModelBR).toHaveProperty('email', 'E-mail');
    expect(I18nUserModelBR).toHaveProperty('userName', 'Nome');
    expect(I18nUserModelBR).toHaveProperty('active', 'Ativo');
    expect(I18nUserModelBR).toHaveProperty('code', 'Código');
    expect(I18nUserModelBR).toHaveProperty('password', 'Senha');
    expect(I18nUserModelBR).toHaveProperty(
      'resetPasswordToken',
      'Token para redefinir senha'
    );
    expect(I18nUserModelBR).toHaveProperty(
      'resetPasswordSentAt',
      'Redefinição de senha enviada em'
    );
    expect(I18nUserModelBR).toHaveProperty(
      'rememberCreateAt',
      'Lembre-se de criar em'
    );
    expect(I18nUserModelBR).toHaveProperty(
      'lastPasswordUpdate',
      'Última atualização de senha'
    );
    expect(I18nUserModelBR).toHaveProperty(
      'passwordExpiration',
      'Expiração de senha'
    );
    expect(I18nUserModelBR).toHaveProperty(
      'failedLoginAttempts',
      'Tentativas de login falhadas'
    );
    expect(I18nUserModelBR).toHaveProperty('lockoutTime', 'Tempo de bloqueio');
    expect(I18nUserModelBR).toHaveProperty('createdBy', 'Criado por');
  });
});

// Testes para I18n_USER_MESSAGE
describe('I18n_USER_MESSAGE', () => {
  it('deve ter a mensagem de sucesso para criação de usuário', () => {
    expect(I18n_USER_MESSAGE.USER_CREATE_SUCCESS).toBe(
      'Usuário cadastrado com sucesso.'
    );
  });

  it('deve ter a mensagem de erro para criação de usuário', () => {
    expect(I18n_USER_MESSAGE.USER_CREATE_ERROR).toBe(
      'Erro ao cadastrar usuário.'
    );
  });
});
