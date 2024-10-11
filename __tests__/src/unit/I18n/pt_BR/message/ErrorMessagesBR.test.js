import { describe, it, expect } from 'vitest';
import { ERROR_MESSAGES_BR } from '../../../../../../src/I18n/pt-BR/message/ErrorMessagesBR.js';

describe('ERROR_MESSAGES_BR', () => {
  it('deve conter a mensagem "Token inválido."', () => {
    expect(ERROR_MESSAGES_BR.INVALID_TOKEN).toBe('Token inválido.');
  });

  it('deve conter a mensagem "Acesso não autorizado."', () => {
    expect(ERROR_MESSAGES_BR.UNAUTHORIZED).toBe('Acesso não autorizado.');
  });

  it('deve conter a mensagem "Erro interno do servidor."', () => {
    expect(ERROR_MESSAGES_BR.INTERNAL_SERVER_ERROR).toBe(
      'Erro interno do servidor.'
    );
  });

  it('deve conter a mensagem "Erro ao cadastrar empresa."', () => {
    expect(ERROR_MESSAGES_BR.ERROR_CREATING_COMPANY).toBe(
      'Erro ao cadastrar empresa.'
    );
  });

  it('deve conter a mensagem "Erro ao iniciar o servidor"', () => {
    expect(ERROR_MESSAGES_BR.ERROR_WHEN_STARTING_SERVER).toBe(
      'Erro ao iniciar o servidor'
    );
  });

  it('deve ter todas as mensagens definidas', () => {
    expect(ERROR_MESSAGES_BR).toHaveProperty('INVALID_TOKEN');
    expect(ERROR_MESSAGES_BR).toHaveProperty('UNAUTHORIZED');
    expect(ERROR_MESSAGES_BR).toHaveProperty('INTERNAL_SERVER_ERROR');
    expect(ERROR_MESSAGES_BR).toHaveProperty('ERROR_CREATING_COMPANY');
    expect(ERROR_MESSAGES_BR).toHaveProperty('ERROR_WHEN_STARTING_SERVER');
  });
});
