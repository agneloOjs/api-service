/**
 * Configurações de ambiente da aplicação
 * @module config/env
 */
import 'dotenv/config';

export const env = {
  /**
   * Ambiente da aplicação
   */
  NODE_ENV: process.env.NODE_ENV || 'development',

  /**
   * Porta do servidor
   */
  PORT: parseInt(process.env.PORT || '8000', 10),

  /**
   * URL de conexão com o banco de dados
   */
  DATABASE_URL: process.env.DATABASE_URL,

  /**
   * Configurações de JWT
   */
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  },

  /**
   * Configurações de CORS
   */
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || '*',

  /**
   * Configurações de rate limit
   */
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutos
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  }
};
