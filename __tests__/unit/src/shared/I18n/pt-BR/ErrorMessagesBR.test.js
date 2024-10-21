import { describe, it, expect } from 'vitest';
import { ERROR_MESSAGES } from '../../../../../../src/shared/I18n/pt-BR/ErrorMessagesBR.js';

describe('ERROR_MESSAGES_BR', () => {
  it('deve retornar a mensagem de erro para erro interno do servidor', () => {
    expect(ERROR_MESSAGES.INTERNAL_SERVER_ERROR).toBe(
      'Erro interno do servidor.'
    );
  });

  it('deve retornar a mensagem de erro ao iniciar o servidor', () => {
    expect(ERROR_MESSAGES.ERROR_WHEN_STARTING_SERVER).toBe(
      'Erro ao iniciar o servidor'
    );
  });
});
