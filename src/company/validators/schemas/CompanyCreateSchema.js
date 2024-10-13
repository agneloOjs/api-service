import { CompanyValidateCNPJ } from '../company/modelsData/CNPJ/CompanyValidateCNPJ.js';

/**
 * Valida o campo corporateReason.
 * @param {string} cnpj
 * @returns {boolean|string}
 */
export function CompanyCreateSchema(cnpj) {
  // Validação: Verifica o CNPJ
  const cnpjValidation = CompanyValidateCNPJ(cnpj);
  if (cnpjValidation !== true) {
    return cnpjValidation;
  }

  return true;
}
