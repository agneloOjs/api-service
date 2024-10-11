/**
 * Verifica se uma string contém caracteres especiais.
 * @param {string} str
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckSpecialCharacters(str, fieldName) {
  const specialCharRegex = /[^a-zA-Z0-9\s]/;

  if (specialCharRegex.test(str)) {
    return `${fieldName} não pode conter caracteres especiais.`;
  }

  return true;
}
