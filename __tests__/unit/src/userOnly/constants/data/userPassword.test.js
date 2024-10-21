import { describe, it, expect } from 'vitest';
import { userPasswordValidate } from '../../../../../../src/userOnly/constants/data/userPassword.js';

describe('userPasswordValidate', () => {
  it('deve retornar erro se a senha estiver vazia', () => {
    const result = userPasswordValidate('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('A senha não pode ser vazia.');
  });

  it('deve retornar erro se a senha for menor que 6 caracteres', () => {
    const result = userPasswordValidate('abc');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve ter pelo menos 6 caracteres.'
    );
  });

  it('deve retornar erro se a senha for maior que 21 caracteres', () => {
    const result = userPasswordValidate('aVeryLongPassword1234567!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve ter no máximo 21 caracteres.'
    );
  });

  it('deve retornar erro se a senha contiver espaços', () => {
    const result = userPasswordValidate('abc def');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('A senha não deve conter espaços.');
  });

  it('deve retornar erro se a senha não contiver letras maiúsculas', () => {
    const result = userPasswordValidate('abcde1!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve conter pelo menos uma letra maiúscula.'
    );
  });

  it('deve retornar erro se a senha não contiver letras minúsculas', () => {
    const result = userPasswordValidate('ABCDE1!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve conter pelo menos uma letra minúscula.'
    );
  });

  it('deve retornar erro se a senha não contiver números', () => {
    const result = userPasswordValidate('Abcdef!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve conter pelo menos um número.'
    );
  });

  it('deve retornar erro se a senha não contiver caracteres especiais', () => {
    const result = userPasswordValidate('Abcdef1');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'A senha deve conter pelo menos um caractere especial.'
    );
  });

  it('deve retornar erro se a senha for uma senha comum', () => {
    const result = userPasswordValidate('123456');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('A senha não deve ser uma senha comum.');
  });

  it('deve retornar true e sem erros se a senha for válida', () => {
    const result = userPasswordValidate('Abcdef1!');
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('deve ignorar espaços no início e no fim da senha', () => {
    const result = userPasswordValidate('  Abcdef1!  ');
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
