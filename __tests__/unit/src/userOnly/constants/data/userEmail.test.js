import { describe, it, expect } from 'vitest';
import { userEmailValidate } from '../../../../../../src/userOnly/constants/data/userEmail.js';

describe('userEmailValidate', () => {
  it('deve retornar erro quando o email não for fornecido', () => {
    const result = userEmailValidate('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('E-mail é obrigatório.');
  });

  it('deve retornar erro quando o email tiver menos de 12 caracteres', () => {
    const result = userEmailValidate('a@b.co');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'E-mail deve ter pelo menos 12 caracteres.'
    );
  });

  it('deve retornar erro quando o email tiver mais de 80 caracteres', () => {
    const longEmail = 'a'.repeat(70) + '@domain.com';
    const result = userEmailValidate(longEmail);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('E-mail deve ter no máximo 80 caracteres.');
  });

  it('deve retornar erro quando o formato do email for inválido', () => {
    const result = userEmailValidate('invalid-email');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Formato de e-mail inválido.');
  });

  it('deve retornar erro quando o domínio do email for temporário', () => {
    const result = userEmailValidate('test@mailinator.com');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'Domínio de e-mail temporário não é permitido.'
    );
  });

  it('deve retornar válido para um email válido', () => {
    const result = userEmailValidate('valid.email@domain.com');
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('deve ignorar espaços em branco no início e no fim', () => {
    const result = userEmailValidate('   valid.email@domain.com   ');
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('deve retornar erro para email com espaços internos', () => {
    const result = userEmailValidate('invalid email@domain.com');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Formato de e-mail inválido.');
  });
});
