import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthUserRepository from '../../../../../../src/authOnly/hash/repositories/AuthUserRepository.js';
import dbService from '../../../../../../src/config/dbService.js';

describe('AuthUserRepository', () => {
  describe('findByEmail', () => {
    beforeEach(() => {
      // Reseta os mocks antes de cada teste
      vi.clearAllMocks();
    });

    it('deve retornar um usuário se o email for encontrado', async () => {
      // Arrange: configura o usuário esperado
      const user = { id: 1, email: 'test@example.com', name: 'Test User' };
      dbService.user.findUnique = vi.fn().mockResolvedValue(user); // Mock da função findUnique

      // Act: chama a função que está sendo testada
      const result = await AuthUserRepository.findByEmail('test@example.com');

      // Assert: verifica se o resultado é o esperado
      expect(result).toEqual(user);
      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      }); // Verifica se a consulta foi feita com o critério correto
    });

    it('deve retornar null se o email não for encontrado', async () => {
      // Arrange: mocka o retorno para null
      dbService.user.findUnique = vi.fn().mockResolvedValue(null);

      // Act: chama a função
      const result = await AuthUserRepository.findByEmail(
        'notfound@example.com'
      );

      // Assert: verifica se o resultado é null
      expect(result).toBeNull();
      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'notfound@example.com' }
      }); // Verifica se a consulta foi feita com o critério correto
    });

    it('deve lançar um erro se houver um erro na consulta ao banco de dados', async () => {
      // Arrange: mocka o erro da consulta
      const errorMessage = 'Erro no banco de dados';
      dbService.user.findUnique = vi
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      // Act & Assert: verifica se a função lança um erro
      await expect(
        AuthUserRepository.findByEmail('error@example.com')
      ).rejects.toThrow(errorMessage);
      expect(dbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'error@example.com' }
      }); // Verifica se a consulta foi feita com o critério correto
    });
  });
});
