import { INVALID_OR_EMPTY_MESSAGES_BR } from '../I18n/pt-BR/message/ErrorFieldInvalidBR.js';

/**
 * Verifica se uma string contém caracteres potencialmente perigosos.
 * @param {string} str
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckInputSafety(str, fieldName) {
  // Regex para detectar caracteres especiais e sequências potencialmente perigosas
  const unsafeRegex = /[<>\\/\[\]{}();'"$%&+=*|`~]/;

  if (unsafeRegex.test(str)) {
    return `${fieldName} ${INVALID_OR_EMPTY_MESSAGES_BR.NO_SPECIAL_CHARACTERS}`;
  }

  return true;
}
