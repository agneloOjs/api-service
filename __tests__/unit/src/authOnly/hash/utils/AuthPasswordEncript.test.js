import { describe, it, expect, beforeEach, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { AuthPasswordEncript } from '../../../../../../src/authOnly/hash/utils/AuthPasswordEncript';

// Mock do bcrypt para evitar hashing real durante os testes
vi.mock('bcrypt');

describe('AuthPasswordEncript', () => {
  const password = 'StrongPassword123!';
  const hashedPassword = 'hashedPasswordMock';

  beforeEach(() => {
    vi.clearAllMocks(); // Limpa mocks antes de cada teste
  });

  describe('passwordHash', () => {
    it('deve gerar um hash para a senha corretamente', async () => {
      // Configura o mock do bcrypt.hash para retornar um valor de hash simulado
      bcrypt.hash.mockResolvedValue(hashedPassword);

      const result = await AuthPasswordEncript.passwordHash(password);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number)); // Verifica se foi chamado com a senha e o salt
      expect(result).toBe(hashedPassword); // Verifica se o hash gerado corresponde ao valor esperado
    });

    it('deve lançar erro se o bcrypt.hash falhar', async () => {
      // Configura o mock do bcrypt.hash para rejeitar com um erro
      bcrypt.hash.mockRejectedValue(new Error('Erro ao gerar hash'));

      await expect(AuthPasswordEncript.passwordHash(password)).rejects.toThrow(
        'Erro ao gerar hash'
      );
    });

    it('deve lançar erro se a senha for inválida (null)', async () => {
      await expect(AuthPasswordEncript.passwordHash(null)).rejects.toThrow();
      expect(bcrypt.hash).not.toHaveBeenCalled(); // Verifica que bcrypt.hash não foi chamado
    });

    it('deve lançar erro se a senha for uma string vazia', async () => {
      await expect(AuthPasswordEncript.passwordHash('')).rejects.toThrow();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });
  });

  describe('passwordVerify', () => {
    it('deve retornar true para senha válida', async () => {
      // Configura o mock do bcrypt.compare para retornar true
      bcrypt.compare.mockResolvedValue(true);

      const result = await AuthPasswordEncript.passwordVerify(
        password,
        hashedPassword
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword); // Verifica se foi chamado com a senha e o hash
      expect(result).toBe(true); // Verifica se a senha corresponde
    });

    it('deve retornar false para senha inválida', async () => {
      // Configura o mock do bcrypt.compare para retornar false
      bcrypt.compare.mockResolvedValue(false);

      const result = await AuthPasswordEncript.passwordVerify(
        'wrongPassword',
        hashedPassword
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongPassword',
        hashedPassword
      ); // Verifica se foi chamado com a senha errada e o hash
      expect(result).toBe(false); // Verifica se a senha é incorreta
    });

    it('deve lançar erro se o bcrypt.compare falhar', async () => {
      // Configura o mock do bcrypt.compare para rejeitar com um erro
      bcrypt.compare.mockRejectedValue(new Error('Erro ao verificar senha'));

      await expect(
        AuthPasswordEncript.passwordVerify(password, hashedPassword)
      ).rejects.toThrow('Erro ao verificar senha');
    });

    it('deve lançar erro se a senha fornecida para verificação for null', async () => {
      await expect(
        AuthPasswordEncript.passwordVerify(null, hashedPassword)
      ).rejects.toThrow();
      expect(bcrypt.compare).not.toHaveBeenCalled(); // Verifica que bcrypt.compare não foi chamado
    });

    it('deve lançar erro se o hash fornecido para verificação for null', async () => {
      await expect(
        AuthPasswordEncript.passwordVerify(password, null)
      ).rejects.toThrow();
      expect(bcrypt.compare).not.toHaveBeenCalled(); // Verifica que bcrypt.compare não foi chamado
    });

    it('deve lançar erro se ambos password e hash forem null', async () => {
      await expect(
        AuthPasswordEncript.passwordVerify(null, null)
      ).rejects.toThrow();
      expect(bcrypt.compare).not.toHaveBeenCalled(); // Verifica que bcrypt.compare não foi chamado
    });
  });
});
