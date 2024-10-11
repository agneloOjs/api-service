import { describe, it, expect } from 'vitest';
import { CheckInputSafety } from '../../../../src/validators/CheckInputSafety.js';
import { INVALID_OR_EMPTY_MESSAGES_BR } from '../../../../src/I18n/pt-BR/message/ErrorFieldInvalidBR.js';

describe('CheckInputSafety', () => {
  const fieldName = 'Campo de Teste'; // Nome do campo para testes

  it('deve retornar true se a string não contiver caracteres potencialmente perigosos', () => {
    const result = CheckInputSafety('Texto seguro', fieldName);
    expect(result).toBe(true);
  });

  it('deve retornar uma mensagem de erro se a string contiver caracteres perigosos', () => {
    const result = CheckInputSafety('Texto com < e >', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar uma mensagem de erro se a string contiver uma barra invertida', () => {
    const result = CheckInputSafety('Texto com \\', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar uma mensagem de erro se a string contiver chaves', () => {
    const result = CheckInputSafety('Texto com {}', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar uma mensagem de erro se a string contiver um ponto e vírgula', () => {
    const result = CheckInputSafety('Texto com ;', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar true para strings vazias', () => {
    const result = CheckInputSafety('', fieldName);
    expect(result).toBe(true);
  });
});
