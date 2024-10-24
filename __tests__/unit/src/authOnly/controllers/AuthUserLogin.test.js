import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthUserController } from '../../../../../src/authOnly/hash/controllers/AuthUserLogin.js';

describe('AuthUserController', () => {
  let authUserController;
  let authUserLoginServiceMock;

  beforeEach(() => {
    authUserLoginServiceMock = {
      login: vi.fn()
    };
    authUserController = new AuthUserController();
    authUserController.authUserLoginService = authUserLoginServiceMock;
  });

  describe('login', () => {
    it('deve retornar status 200 e o resultado do login quando as credenciais estiverem corretas', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'correctPassword'
        }
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      };

      const loginResult = { token: 'validToken' };
      authUserLoginServiceMock.login.mockResolvedValue(loginResult);

      await authUserController.login(req, res);

      expect(authUserLoginServiceMock.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(loginResult);
    });

    it('deve retornar status 401 e mensagem de erro quando as credenciais estiverem incorretas', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongPassword'
        }
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      };

      const errorMessage = 'Credenciais inválidas';
      authUserLoginServiceMock.login.mockRejectedValue(new Error(errorMessage));

      await authUserController.login(req, res);

      expect(authUserLoginServiceMock.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('deve retornar status 401 e mensagem de erro quando ocorrer um erro inesperado', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'anyPassword'
        }
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      };

      const unexpectedErrorMessage = 'Erro inesperado';
      authUserLoginServiceMock.login.mockRejectedValue(
        new Error(unexpectedErrorMessage)
      ); // Mockar erro inesperado

      await authUserController.login(req, res);

      expect(authUserLoginServiceMock.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: unexpectedErrorMessage
      });
    });
  });
});
