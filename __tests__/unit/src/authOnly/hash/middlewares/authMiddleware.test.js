import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from '../../../../../../src/authOnly/hash/middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import Logger from '../../../../../../src/shared/utils/Logger.js';
import { I18n_USER_TOKEN_MESSAGE } from '../../../../../../src/authOnly/I18n/pt-BR/UserTokenModel.js';

// Mock do Logger
vi.mock('../../../shared/utils/Logger.js');

describe('authMiddleware', () => {
  it('deve retornar 403 se o token não for fornecido', async () => {
    const req = { headers: {} };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: I18n_USER_TOKEN_MESSAGE.TOKEN_NOT_PROVIDED
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('deve retornar 401 se o token for inválido', async () => {
    const req = {
      headers: { authorization: `${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}` }
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    // Mock de jwt.verify para lançar um erro
    vi.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error(`${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}`);
    });

    // Mock para Logger.error
    const loggerSpy = vi.spyOn(Logger, 'error');

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: I18n_USER_TOKEN_MESSAGE.UNAUTHORIZED
    });
    expect(next).not.toHaveBeenCalled();
    expect(loggerSpy).toHaveBeenCalled(); // Verifica se o Logger.error foi chamado
  });

  it('deve chamar next() e atribuir userId se o token for válido', async () => {
    const userId = '12345';
    const req = {
      headers: { authorization: `${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}` }
    };
    const res = {};
    const next = vi.fn();

    // Mock de jwt.verify para retornar um objeto decodificado
    vi.spyOn(jwt, 'verify').mockReturnValue({ id: userId });

    await authMiddleware(req, res, next);

    expect(req.userId).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  it('deve retornar 401 e chamar Logger.error se houver um erro não relacionado à validação do token', async () => {
    const req = {
      headers: { authorization: `${I18n_USER_TOKEN_MESSAGE.TOKEN_INVALID}` }
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    const next = vi.fn();

    // Mock de jwt.verify para lançar um erro genérico
    vi.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error(`${I18n_USER_TOKEN_MESSAGE.UNEXPECTED_ERROR}`);
    });

    // Mock para Logger.error
    const loggerSpy = vi.spyOn(Logger, 'error');

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: I18n_USER_TOKEN_MESSAGE.UNAUTHORIZED
    });
    expect(next).not.toHaveBeenCalled();
    expect(loggerSpy).toHaveBeenCalled();
  });
});
