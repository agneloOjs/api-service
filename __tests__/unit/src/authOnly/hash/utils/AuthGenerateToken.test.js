import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthGenerateToken } from '../../../../../../src/authOnly/hash/utils/AuthGenerateToken.js';
import { envConfig } from '../../../../../../src/config/envConfig.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../../../../../src/authOnly/I18n/pt-BR/UserTokenModel.js';
import jwt from 'jsonwebtoken';

// Mock do jwt.sign e jwt.verify
vi.mock('jsonwebtoken');

describe('AuthGenerateToken', () => {
  const userId = '12345';
  const token = 'mockToken';

  beforeEach(() => {
    vi.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  describe('generateToken', () => {
    it('deve gerar um token JWT corretamente', () => {
      vi.mocked(jwt.sign).mockReturnValue(token); // Mock do retorno do jwt.sign

      const result = AuthGenerateToken.generateToken(userId);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: userId },
        envConfig.JWT.ACCESS_SECRET,
        { expiresIn: envConfig.JWT.ACCESS_EXPIRES_IN }
      );
      expect(result).toBe(token); // Verifica se o resultado é o token mockado
    });

    it('deve lançar erro se userId for inválido', () => {
      expect(() => AuthGenerateToken.generateToken(null)).toThrow(); // Teste com userId nulo
      expect(() => AuthGenerateToken.generateToken('')).toThrow(); // Teste com userId vazio
    });
  });

  describe('verifyToken', () => {
    it('deve verificar e decodificar um token JWT corretamente', () => {
      const decoded = { id: userId };
      vi.mocked(jwt.verify).mockReturnValue(decoded); // Mock do retorno do jwt.verify

      const result = AuthGenerateToken.verifyToken(token);

      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        envConfig.JWT.ACCESS_SECRET
      );
      expect(result).toEqual(decoded); // Verifica se o resultado é o objeto decodificado
    });

    it('deve lançar erro se o token for inválido', () => {
      vi.mocked(jwt.verify).mockImplementation(() => {
        throw new Error(`${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}`); // Mock de erro ao verificar o token
      });

      expect(() => AuthGenerateToken.verifyToken(token)).toThrow(
        `${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}`
      ); // Teste de erro
    });

    it('deve lançar erro se o token for nulo', () => {
      expect(() => AuthGenerateToken.verifyToken(null)).toThrow(); // Teste com token nulo
    });

    it('deve lançar erro se o token for uma string vazia', () => {
      expect(() => AuthGenerateToken.verifyToken('')).toThrow(); // Teste com token vazio
    });
  });
});
