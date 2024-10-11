import { INVALID_OR_EMPTY_MESSAGES_BR } from '../I18n/pt-BR/message/ErrorFieldInvalidBR.js';

/**
 * Verifica se um campo está vazio.
 * @param {any} field
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckIsFieldEmpty(field, fieldName) {
  const sanitizedField = field ? field.trim() : '';

  if (!sanitizedField) {
    return `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NOT_EMPTY_FIELD}`;
  }

  return true;
}
