import { describe, it, expect } from 'vitest';
import { CheckNoSpecialCharacters } from '../../../../src/validators/CheckNoSpecialCharacters.js';
import { INVALID_OR_EMPTY_MESSAGES_BR } from '../../../../src/I18n/pt-BR/message/ErrorFieldInvalidBR.js';

describe('CheckNoSpecialCharacters', () => {
  const fieldName = 'Campo de Teste';

  it('deve retornar true se a string não contiver caracteres especiais', () => {
    const result = CheckNoSpecialCharacters('Texto seguro', fieldName);
    expect(result).toBe(true);
  });

  it('deve retornar uma mensagem de erro se a string contiver caracteres especiais', () => {
    const result = CheckNoSpecialCharacters('Texto com @ e #', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar uma mensagem de erro se a string contiver um caractere especial', () => {
    const result = CheckNoSpecialCharacters('Texto com $', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar true para uma string vazia', () => {
    const result = CheckNoSpecialCharacters('', fieldName);
    expect(result).toBe(true);
  });

  it('deve retornar true para uma string com apenas espaços', () => {
    const result = CheckNoSpecialCharacters('   ', fieldName);
    expect(result).toBe(true);
  });

  it('deve retornar uma mensagem de erro se a string contiver um caractere especial no início', () => {
    const result = CheckNoSpecialCharacters('@Texto', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });

  it('deve retornar uma mensagem de erro se a string contiver um caractere especial no final', () => {
    const result = CheckNoSpecialCharacters('Texto@', fieldName);
    expect(result).toBe(
      `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`
    );
  });
});
