import { I18nCompanyBR } from '../../../I18n/pt-BR/models/I18nCompanyBR.js';
import { CheckIsFieldEmpty } from '../../CheckIsFieldEmpty.js';
import { CheckNoSpecialCharacters } from '../../CheckNoSpecialCharacters.js';

/**
 * Verifica se uma string contém caracteres potencialmente perigosos.
 * @param {string} str
 * @param {string} fieldName
 * @returns {boolean|string}
 */
export function CheckInputSafety(str, fieldName) {
  const unsafeRegex = /[<>\\/\[\]{}();'"$%&+=*|`~]/;

  if (unsafeRegex.test(str)) {
    return `${fieldName} contém caracteres potencialmente perigosos.`;
  }

  return true; // Retorna true se a string for segura
}

/**
 * Valida o campo corporateReason.
 * @param {string} corporateReason
 * @returns {boolean|string}
 */
export function CompanyCreateSchema(corporateReason) {
  // Remove espaços em branco do início e do final da string
  const sanitizedCorporateReason = corporateReason.trim();

  // Validação: Verifica se o campo está vazio
  const isFieldEmpty = CheckIsFieldEmpty(
    sanitizedCorporateReason,
    `${I18nCompanyBR.companyCorporateReason}`
  );
  if (isFieldEmpty !== true) {
    return isFieldEmpty;
  }

  // Validação: Verifica se o campo contém caracteres especiais
  const hasSpecialChars = CheckNoSpecialCharacters(
    sanitizedCorporateReason,
    `${I18nCompanyBR.companyCorporateReason}`
  );
  if (hasSpecialChars !== true) {
    return hasSpecialChars;
  }

  // Validação: Verifica se o campo contém caracteres potencialmente perigosos
  const safetyCheck = CheckInputSafety(
    sanitizedCorporateReason,
    `${I18nCompanyBR.companyCorporateReason}`
  );
  if (safetyCheck !== true) {
    return safetyCheck;
  }

  return true;
}
