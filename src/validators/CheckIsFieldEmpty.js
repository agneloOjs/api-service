import { INVALID_OR_EMPTY_MESSAGES } from '../constants/ErrorMessages.js';

/**
 * Verifica se um campo está vazio.
 * @param {any} field
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckIsFieldEmpty(field, fieldName) {
  const sanitizedField = field ? field.trim() : '';

  if (!sanitizedField) {
    return `${fieldName} ${INVALID_OR_EMPTY_MESSAGES.NOT_EMPTY_FIELD}`;
  }

  return true;
}
