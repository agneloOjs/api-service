import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { envConfig } from '../../../../src/config/envConfig.js';

describe('Configurações de ambiente', () => {
  beforeAll(() => {
    // Configura variáveis de ambiente para os testes
    process.env.NODE_ENV;
    process.env.API_PORT;
    process.env.DATABASE_URL;
    process.env.JWT_SECRET;
    process.env.JWT_SECRET_EXPIRES_IN;
    process.env.REFRESH_JWT_SECRET_EXPIRES_IN;
    process.env.CORS_ORIGIN;
    process.env.RATE_LIMIT_WINDOW_MS;
    process.env.RATE_LIMIT_MAX_REQUESTS;
    process.env.SALT_ROUNDS_PASSWORD;
  });

  afterAll(() => {
    // Limpa as variáveis de ambiente após os testes
    process.env.NODE_ENV;
    process.env.API_PORT;
    process.env.DATABASE_URL;
    process.env.JWT_SECRET;
    process.env.JWT_SECRET_EXPIRES_IN;
    process.env.REFRESH_JWT_SECRET_EXPIRES_IN;
    process.env.CORS_ORIGIN;
    process.env.RATE_LIMIT_WINDOW_MS;
    process.env.RATE_LIMIT_MAX_REQUESTS;
    process.env.SALT_ROUNDS_PASSWORD;
  });

  it('deve retornar o ambiente correto', () => {
    expect(envConfig.NODE_ENV).toBe('test');
  });

  it('deve retornar a porta correta', () => {
    expect(envConfig.PORT).toBe(8000);
  });

  it('deve retornar a URL do banco de dados correta', () => {
    expect(envConfig.DATABASE_URL).toBe(process.env.DATABASE_URL);
  });

  it('deve retornar as configurações de JWT corretas', () => {
    expect(envConfig.JWT.ACCESS_SECRET).toBe(process.env.JWT_SECRET);
    expect(envConfig.JWT.ACCESS_EXPIRES_IN).toBe('15m');
    expect(envConfig.JWT.REFRESH_EXPIRES_IN).toBe('5h');
    expect(envConfig.JWT.SALT_ROUNDS).toBe('12');
  });

  it('deve retornar as configurações de CORS corretas', () => {
    expect(envConfig.CORS_ORIGIN).toEqual(['http://localhost']);
  });

  it('deve retornar as configurações de rate limit corretas', () => {
    expect(envConfig.RATE_LIMIT.WINDOW_MS).toBe(900000);
    expect(envConfig.RATE_LIMIT.MAX_REQUESTS).toBe(100);
  });
});
