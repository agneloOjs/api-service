import { I18nCompanyBR } from '../../../I18n/pt-BR/models/I18nCompanyBR.js';
import { CheckInputSafety } from '../../CheckInputSafety.js';
import { CheckIsFieldEmpty } from '../../CheckIsFieldEmpty.js';
import { CheckNoSpecialCharacters } from '../../CheckNoSpecialCharacters.js';
import { CompanyValidateCNPJ } from '../../company/data/CompanyCNPJ.js';

/**
 * Valida o campo corporateReason.
 * @param {string} corporateReason
 * @param {string} cnpj
 * @returns {boolean|string}
 */
export function CompanyCreateSchema(corporateReason, cnpj) {
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
    console.log(safetyCheck);
    return safetyCheck;
  }

  // Validação: Verifica o CNPJ
  const cnpjValidation = CompanyValidateCNPJ(cnpj);
  if (cnpjValidation !== true) {
    console.log(cnpjValidation); // Corrigido para usar a variável correta
    return cnpjValidation;
  }

  return true;
}
