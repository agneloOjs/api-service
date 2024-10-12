import { VALIDATE_INPUT_DATA_COMPANY } from '../../../../I18n/pt-BR/models/I18nCompanyBR.js';

export const CompanyValidateCNPJ = (cnpj) => {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_LENGTH}`;

  // Elimina CNPJs inválidos conhecidos (como todos os números iguais)
  if (/^(\d)\1+$/.test(cnpj))
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID}`;

  // Valida os dois dígitos verificadores
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0))
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID}`;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1))
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID}`;

  return true;
};
