/**
 * Configurações de ambiente da aplicação
 * @module config/envIndex
 */
import 'dotenv/config';

export const envConfig = {
  /**
   * Ambiente da aplicação
   */
  NODE_ENV: process.env.NODE_ENV,

  /**
   * Porta do servidor
   */
  PORT: parseInt(process.env.API_PORT),

  /**
   * URL de conexão com o banco de dados
   */
  DATABASE_URL: process.env.DATABASE_URL,

  /**
   * Configurações de JWT
   */
  JWT: {
    ACCESS_SECRET: process.env.JWT_SECRET,
    ACCESS_EXPIRES_IN: process.env.JWT_SECRET_EXPIRES_IN,
    REFRESH_EXPIRES_IN: process.env.REFRESH_JWT_SECRET_EXPIRES_IN
  },

  /**
   * Configurações de CORS
   */
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || '*',

  /**
   * Configurações de rate limit
   */
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  }
};
