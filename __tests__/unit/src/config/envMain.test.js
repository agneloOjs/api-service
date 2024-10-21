import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { envMain } from '../../../../src/config/envMain.js';

describe('Configurações de ambiente', () => {
  beforeAll(() => {
    // Configura variáveis de ambiente para os testes
    process.env.NODE_ENV;
    process.env.API_PORT;
    process.env.DATABASE_URL;
    process.env.ACCESS_TOKEN_SECRET;
    process.env.ACCESS_TOKEN_EXPIRES_IN;
    process.env.REFRESH_TOKEN_SECRET;
    process.env.REFRESH_TOKEN_EXPIRES_IN;
    process.env.CORS_ORIGIN;
    process.env.RATE_LIMIT_WINDOW_MS;
    process.env.RATE_LIMIT_MAX_REQUESTS;
  });

  afterAll(() => {
    // Limpa as variáveis de ambiente após os testes
    delete process.NODE_ENV;
    delete process.env.API_PORT;
    delete process.env.DATABASE_URL;
    delete process.env.ACCESS_TOKEN_SECRET;
    delete process.env.ACCESS_TOKEN_EXPIRES_IN;
    delete process.env.REFRESH_TOKEN_SECRET;
    delete process.env.REFRESH_TOKEN_EXPIRES_IN;
    delete process.env.CORS_ORIGIN;
    delete process.env.RATE_LIMIT_WINDOW_MS;
    delete process.env.RATE_LIMIT_MAX_REQUESTS;
  });

  it('deve retornar o ambiente correto', () => {
    expect(envMain.NODE_ENV).toBe('test');
  });

  it('deve retornar a porta correta', () => {
    expect(envMain.PORT).toBe(8000);
  });

  it('deve retornar a URL do banco de dados correta', () => {
    expect(envMain.DATABASE_URL).toBe(process.env.DATABASE_URL);
  });

  it('deve retornar as configurações de JWT corretas', () => {
    expect(envMain.JWT.ACCESS_SECRET).toBe('myAccessSecret');
    expect(envMain.JWT.ACCESS_EXPIRES_IN).toBe('15m');
    expect(envMain.JWT.REFRESH_SECRET).toBe('myRefreshSecret');
    expect(envMain.JWT.REFRESH_EXPIRES_IN).toBe('5h');
  });

  it('deve retornar as configurações de CORS corretas', () => {
    expect(envMain.CORS_ORIGIN).toEqual(['http://localhost']);
  });

  it('deve retornar as configurações de rate limit corretas', () => {
    expect(envMain.RATE_LIMIT.WINDOW_MS).toBe(900000);
    expect(envMain.RATE_LIMIT.MAX_REQUESTS).toBe(100);
  });
});
