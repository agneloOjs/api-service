import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import dbService from '../../../../../../src/config/dbService.js';
import AuthRepository from '../../../../../../src/authOnly/hash/repositories/AuthRepository.js';

// Mock do dbService
vi.mock('../../../../../../src/config/dbService.js', () => ({
  default: {
    userToken: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn()
    }
  }
}));

describe('AuthRepository', () => {
  let authRepository;
  const mockDate = new Date('2024-01-01T00:00:00Z');

  beforeEach(() => {
    authRepository = new AuthRepository();
    vi.clearAllMocks();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('createToken', () => {
    it('deve criar um novo token com sucesso', async () => {
      const mockTokenData = {
        userId: 1,
        accessToken: 'test-token',
        expiresAt: new Date('2024-01-02'),
        revoked: false
      };

      const mockCreatedToken = { ...mockTokenData, id: 1 };
      dbService.userToken.create.mockResolvedValue(mockCreatedToken);

      const result = await authRepository.createToken(mockTokenData);

      expect(dbService.userToken.create).toHaveBeenCalledTimes(1);
      expect(dbService.userToken.create).toHaveBeenCalledWith({
        data: mockTokenData
      });
      expect(result).toEqual(mockCreatedToken);
    });

    it('deve lançar erro ao falhar na criação do token', async () => {
      const mockError = new Error('Database error');
      dbService.userToken.create.mockRejectedValue(mockError);

      const mockTokenData = {
        userId: 1,
        accessToken: 'test-token',
        expiresAt: new Date('2024-01-02'),
        revoked: false
      };

      await expect(authRepository.createToken(mockTokenData)).rejects.toThrow(
        'Database error'
      );
    });
  });

  describe('findByAccessToken', () => {
    it('deve encontrar um token válido', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        accessToken: 'valid-token',
        expiresAt: new Date('2024-01-02'),
        revoked: false
      };

      dbService.userToken.findUnique.mockResolvedValue(mockToken);

      const result = await authRepository.findByAccessToken('valid-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledTimes(1);
      expect(dbService.userToken.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'valid-token' }
      });
      expect(result).toEqual(mockToken);
    });

    it('deve retornar null para token inexistente', async () => {
      dbService.userToken.findUnique.mockResolvedValue(null);

      const result = await authRepository.findByAccessToken('invalid-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe('revokeToken', () => {
    it('deve revogar um token com sucesso', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        accessToken: 'token-to-revoke',
        expiresAt: new Date('2024-01-02'),
        revoked: true
      };

      dbService.userToken.update.mockResolvedValue(mockToken);

      const result = await authRepository.revokeToken('token-to-revoke');

      expect(dbService.userToken.update).toHaveBeenCalledTimes(1);
      expect(dbService.userToken.update).toHaveBeenCalledWith({
        where: { accessToken: 'token-to-revoke' },
        data: { revoked: true }
      });
      expect(result).toEqual(mockToken);
    });

    it('deve lançar erro ao tentar revogar token inexistente', async () => {
      const mockError = new Error('Token not found');
      dbService.userToken.update.mockRejectedValue(mockError);

      await expect(
        authRepository.revokeToken('non-existent-token')
      ).rejects.toThrow('Token not found');
    });
  });

  describe('isTokenInvalid', () => {
    it('deve retornar true para token inexistente', async () => {
      dbService.userToken.findUnique.mockResolvedValue(null);

      const result = await authRepository.isTokenInvalid('non-existent-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'non-existent-token' }
      });
      expect(result).toBe(true);
    });

    it('deve retornar true para token revogado', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        accessToken: 'revoked-token',
        expiresAt: new Date('2024-01-02'),
        revoked: true
      };

      dbService.userToken.findUnique.mockResolvedValue(mockToken);

      const result = await authRepository.isTokenInvalid('revoked-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'revoked-token' }
      });
      expect(result).toBe(true);
    });

    it('deve retornar true para token expirado', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        accessToken: 'expired-token',
        expiresAt: new Date('2023-12-31'), // Data anterior ao mockDate
        revoked: false
      };

      dbService.userToken.findUnique.mockResolvedValue(mockToken);

      const result = await authRepository.isTokenInvalid('expired-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'expired-token' }
      });
      expect(result).toBe(true);
    });

    it('deve retornar false para token válido', async () => {
      const mockToken = {
        id: 1,
        userId: 1,
        accessToken: 'valid-token',
        expiresAt: new Date('2024-01-02'), // Data futura ao mockDate
        revoked: false
      };

      dbService.userToken.findUnique.mockResolvedValue(mockToken);

      const result = await authRepository.isTokenInvalid('valid-token');

      expect(dbService.userToken.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'valid-token' }
      });
      expect(result).toBe(false);
    });
  });
});
