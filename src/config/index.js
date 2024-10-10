/**
 * Constantes da aplicação.
 * @module config/index
 */

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
