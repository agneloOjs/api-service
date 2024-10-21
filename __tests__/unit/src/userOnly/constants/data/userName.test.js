import { describe, it, expect } from 'vitest';
import { userNameValidate } from '../../../../../../src/userOnly/constants/data/userName.js';

describe('userNameValidate', () => {
  it('deve retornar erro quando o nome estiver vazio', () => {
    const result = userNameValidate('');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome é obrigatório.');
  });

  it('deve retornar erro quando o nome for apenas espaços', () => {
    const result = userNameValidate('   ');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome é obrigatório.');
  });

  it('deve retornar erro quando o nome tiver menos de 3 caracteres', () => {
    const result = userNameValidate('Jo');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome deve ter pelo menos 3 caracteres.');
  });

  it('deve retornar erro quando o nome tiver mais de 80 caracteres', () => {
    const longName = 'a'.repeat(81); // Nome com 81 caracteres
    const result = userNameValidate(longName);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome deve ter no máximo 80 caracteres.');
  });

  it('deve retornar erro quando o nome contém caracteres inválidos', () => {
    const result = userNameValidate('João123!');
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Nome contém caracteres inválidos.');
  });

  it('deve passar quando o nome é válido', () => {
    const result = userNameValidate('João da Silva');
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('deve passar quando o nome contém acentos, hífens e apóstrofos', () => {
    const result = userNameValidate("O'Connor-Antônio");
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });
});
