import { VALIDATE_INPUT_DATA_COMPANY } from '../../../../I18n/pt-BR/models/I18nCompanyBR.js';

export const CompanyValidateCNPJ = (cnpj) => {
  // Remove caracteres não numéricos
  const sanitizedCNPJ = cnpj.replace(/[^\d]+/g, '');

  // Verifica se tem 14 dígitos
  if (sanitizedCNPJ.length !== 14) {
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_LENGTH}`;
  }

  // Elimina CNPJs inválidos conhecidos (como todos os números iguais)
  if (/^(\d)\1+$/.test(sanitizedCNPJ)) {
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID}`;
  }

  // Função para calcular os dígitos verificadores
  const calculateCheckDigits = (cnpj) => {
    const length = cnpj.length - 2;
    let sum = 0;
    let pos = length - 7;

    // Cálculo do primeiro dígito verificador
    for (let i = length; i >= 1; i--) {
      sum += Number(cnpj.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    const firstCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Se o primeiro dígito não confere
    if (firstCheckDigit !== Number(cnpj.charAt(length))) {
      return;
    }

    // Cálculo do segundo dígito verificador
    const secondLength = length + 1;
    sum = 0;
    pos = secondLength - 7;

    for (let i = secondLength; i >= 1; i--) {
      sum += Number(cnpj.charAt(secondLength - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    const secondCheckDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    // Se o segundo dígito não confere
    if (secondCheckDigit !== Number(cnpj.charAt(secondLength))) {
      return false;
    }

    return true;
  };

  // Verifica se os dígitos verificadores estão corretos
  if (!calculateCheckDigits(sanitizedCNPJ)) {
    return `${VALIDATE_INPUT_DATA_COMPANY.CNPJ_INVALID}`;
  }

  return true;
};
