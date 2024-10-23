import bcrypt from 'bcrypt';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Logger from '../../../../../../src/shared/utils/Logger.js';
import { passwordCompare } from '../../../../../../src/authOnly/hash/utils/passwordCompare.js';

vi.mock('bcrypt');
vi.spyOn(Logger, 'error');

describe('passwordCompare', () => {
  const password = 'senha123';
  const hashedPassword = '$2b$10$abcdefghijklmnopqrstuv';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar true quando as senhas coincidem', async () => {
    bcrypt.compare.mockResolvedValue(true);

    const result = await passwordCompare(password, hashedPassword);

    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });

  it('deve retornar false quando as senhas não coincidem', async () => {
    bcrypt.compare.mockResolvedValue(false);

    const result = await passwordCompare(password, hashedPassword);

    expect(result).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
  });

  it('deve lançar um erro e logar uma mensagem se o bcrypt lançar um erro', async () => {
    const errorMessage = 'Erro do bcrypt';
    bcrypt.compare.mockRejectedValue(new Error(errorMessage));

    await expect(passwordCompare(password, hashedPassword)).rejects.toThrow(
      'Erro ao comparar as senhas'
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(Logger.error).toHaveBeenCalledWith(new Error(errorMessage)); // Valida que o Logger capturou o erro
  });
});
