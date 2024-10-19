import { I18nUserModelBR } from '../../../../../src/userOnly/I18n/pt-BR/UserModel.js';
import { describe, it, expect } from 'vitest';

describe('I18nUserModelBR', () => {
  it('deve ter todas as chaves e valores corretos', () => {
    const expectedKeys = [
      'id',
      'createdAt',
      'updatedAt',
      'email',
      'userName',
      'active',
      'code',
      'password',
      'resetPasswordToken',
      'resetPasswordSentAt',
      'rememberCreateAt',
      'lastPasswordUpdate',
      'passwordExpiration',
      'failedLoginAttempts',
      'lockoutTime',
      'createdBy'
    ];

    const expectedValues = [
      'id',
      'Criado em',
      'Atualizado em',
      'E-mail',
      'Nome',
      'Ativo',
      'Código',
      'Senha',
      'Token para redefinir senha',
      'Redefinição de senha enviada em',
      'Lembre-se de criar em',
      'Última atualização de senha',
      'Expiração de senha',
      'Tentativas de login falhadas',
      'Tempo de bloqueio',
      'Criado por'
    ];

    // Verifica se todas as chaves existem
    expectedKeys.forEach((key) => {
      expect(I18nUserModelBR).toHaveProperty(key);
    });

    // Verifica se os valores estão corretos
    expectedKeys.forEach((key, index) => {
      expect(I18nUserModelBR[key]).toBe(expectedValues[index]);
    });
  });
});
