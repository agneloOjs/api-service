import { describe, it, expect } from 'vitest';
import {
  I18nUserTokenrModelBR,
  I18n_USER_TOKEN_MESSAGE
} from '../../../../../../src/authOnly/I18n/pt-BR/UserTokenModel.js';

describe('I18nUserTokenrModelBR', () => {
  it('deve conter as propriedades corretas', () => {
    expect(I18nUserTokenrModelBR).toEqual({
      id: 'id',
      userId: 'Usuário',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
      accessToken: 'Token de acesso',
      refreshToken: 'Token atualizado',
      deviceType: 'Tipo de dispositivo',
      deviceId: 'ID do dispositivo',
      revoked: 'Token revogado',
      ipAddress: 'Endereço IP'
    });
  });

  it('deve ter a propriedade "id" com o valor "id"', () => {
    expect(I18nUserTokenrModelBR.id).toBe('id');
  });

  it('deve ter a propriedade "userId" com o valor "Usuário"', () => {
    expect(I18nUserTokenrModelBR.userId).toBe('Usuário');
  });

  it('deve ter a propriedade "createdAt" com o valor "createdAt"', () => {
    expect(I18nUserTokenrModelBR.createdAt).toBe('Criado em');
  });

  it('deve ter a propriedade "updatedAt" com o valor "Atualizado em"', () => {
    expect(I18nUserTokenrModelBR.updatedAt).toBe('Atualizado em');
  });

  it('deve ter a propriedade "accessToken" com o valor "Token de acesso"', () => {
    expect(I18nUserTokenrModelBR.accessToken).toBe('Token de acesso');
  });

  it('deve ter a propriedade "refreshToken" com o valor "Token atualizado"', () => {
    expect(I18nUserTokenrModelBR.refreshToken).toBe('Token atualizado');
  });

  it('deve ter a propriedade "deviceType" com o valor "Tipo de dispositivo"', () => {
    expect(I18nUserTokenrModelBR.deviceType).toBe('Tipo de dispositivo');
  });

  it('deve ter a propriedade "deviceId" com o valor "ID do dispositivo"', () => {
    expect(I18nUserTokenrModelBR.deviceId).toBe('ID do dispositivo');
  });

  it('deve ter a propriedade "revoked" com o valor "Token revogado"', () => {
    expect(I18nUserTokenrModelBR.revoked).toBe('Token revogado');
  });

  it('deve ter a propriedade "ipAddress" com o valor "Token revogado"', () => {
    expect(I18nUserTokenrModelBR.ipAddress).toBe('Endereço IP');
  });
});

describe('I18n_USER_TOKEN_MESSAGE', () => {
  it('deve conter as mensagens corretas', () => {
    expect(I18n_USER_TOKEN_MESSAGE).toEqual({
      UNAUTHORIZED: 'Não autorizado',
      USER_INVALID: 'Usuário inválido',
      PASSWORD_INVALID: 'Senha inválida',
      TOKEN_NOT_PROVIDED: 'Token não fornecido!',
      PASSWORD_COMPARE: 'Erro ao comparar as senhas',
      LOGIN_SUCCESS: 'Login realizado com sucesso',
      USER_NOT_EXIST: 'Usuário não encontrado',
      UNEXPECTED_ERROR: 'Erro inesperado',
      TOKEN_INVALID: 'Token inválido'
    });
  });

  it('deve ter a mensagem "UNAUTHORIZED" com o valor "Não autorizado"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.UNAUTHORIZED).toBe('Não autorizado');
  });

  it('deve ter a mensagem "USER_INVALID" com o valor "Usuário inválido"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.USER_INVALID).toBe('Usuário inválido');
  });

  it('deve ter a mensagem "PASSWORD_INVALID" com o valor "Senha inválida"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.PASSWORD_INVALID).toBe('Senha inválida');
  });

  it('deve ter a mensagem "TOKEN_NOT_PROVIDED" com o valor "Token não fornecido!"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.TOKEN_NOT_PROVIDED).toBe(
      'Token não fornecido!'
    );
  });

  it('deve ter a mensagem "PASSWORD_COMPARE" com o valor "Erro ao comparar as senhas"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.PASSWORD_COMPARE).toBe(
      'Erro ao comparar as senhas'
    );
  });

  it('deve ter a mensagem " LOGIN_SUCCESS" com o valor "Login realizado com sucesso"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.LOGIN_SUCCESS).toBe(
      'Login realizado com sucesso'
    );
  });

  it('deve ter a mensagem "USER_NOT_EXIST" com o valor "Usuário não encontrado"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.USER_NOT_EXIST).toBe(
      'Usuário não encontrado'
    );
  });

  it('deve ter a mensagem "UNEXPECTED_ERROR" com o valor "Erro inesperado"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.UNEXPECTED_ERROR).toBe('Erro inesperado');
  });

  it('deve ter a mensagem "TOKEN_INVALID" com o valor "Token inválido"', () => {
    expect(I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID).toBe('Token inválido');
  });
});
