import { INVALID_OR_EMPTY_MESSAGES_BR } from '../I18n/pt-BR/message/ErrorFieldInvalidBR.js';

/**
 * Verifica se uma string contém caracteres especiais.
 * @param {string} str
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckNoSpecialCharacters(str, fieldName) {
  const specialCharRegex = /^[a-zA-Z0-9\s]*$/;

  if (!specialCharRegex.test(str)) {
    return `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`;
  }

  return true;
}
