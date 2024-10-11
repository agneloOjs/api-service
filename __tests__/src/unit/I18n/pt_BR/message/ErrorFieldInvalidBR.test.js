import { describe, it, expect } from 'vitest';
import { INVALID_OR_EMPTY_MESSAGES_BR } from '../../../../../../src/I18n/pt-BR/message/ErrorFieldInvalidBR.js';

describe('INVALID_OR_EMPTY_MESSAGES_BR', () => {
  it('deve conter a mensagem para dados inválidos', () => {
    expect(INVALID_OR_EMPTY_MESSAGES_BR.INVALID_DATA).toBe('inválido.');
  });

  it('deve conter a mensagem para campos não vazios', () => {
    expect(INVALID_OR_EMPTY_MESSAGES_BR.NOT_EMPTY_FIELD).toBe(
      'não pode estar vazio.'
    );
  });

  it('deve conter a mensagem para caracteres especiais', () => {
    expect(INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS).toBe(
      'não pode conter caracteres especiais.'
    );
  });

  it('deve ter todas as mensagens definidas', () => {
    expect(INVALID_OR_EMPTY_MESSAGES_BR).toHaveProperty('INVALID_DATA');
    expect(INVALID_OR_EMPTY_MESSAGES_BR).toHaveProperty('NOT_EMPTY_FIELD');
    expect(INVALID_OR_EMPTY_MESSAGES_BR).toHaveProperty(
      'NO_SPECIAL_CHARACTERS'
    );
  });
});
