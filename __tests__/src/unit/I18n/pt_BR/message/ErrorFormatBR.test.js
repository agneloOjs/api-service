import { describe, it, expect } from 'vitest';
import { STRING_MESSAGES_BR } from '../../../../../../src/I18n/pt-BR/message/ErrorFormatBR.js';

describe('STRING_MESSAGES_BR', () => {
  it('deve conter a mensagem "e"', () => {
    expect(STRING_MESSAGES_BR.AND).toBe('e');
  });

  it('deve conter a mensagem "caracteres"', () => {
    expect(STRING_MESSAGES_BR.CHARACTERS).toBe('caracteres');
  });

  it('deve conter a mensagem "Deve ter entre"', () => {
    expect(STRING_MESSAGES_BR.MUST_HAVEBE_TWEEN).toBe('Deve ter entre');
  });

  it('deve ter todas as mensagens definidas', () => {
    expect(STRING_MESSAGES_BR).toHaveProperty('AND');
    expect(STRING_MESSAGES_BR).toHaveProperty('CHARACTERS');
    expect(STRING_MESSAGES_BR).toHaveProperty('MUST_HAVEBE_TWEEN');
  });
});
