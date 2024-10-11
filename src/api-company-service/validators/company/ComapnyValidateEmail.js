/**
 * Valida o e-mail e remove espaços em branco.
 * @param {string} email
 * @returns {boolean|string}
 */
export default function CompanyValidateEmail(email) {
  // Remove espaços em branco
  const sanitizedEmail = email.trim();

  // Verifica o tamanho do e-mail
  const minLength = 12;
  const maxLength = 128;
  if (sanitizedEmail.length < minLength || sanitizedEmail.length > maxLength) {
    return `O e-mail deve ter entre ${minLength} e ${maxLength} caracteres.`;
  }

  // Valida se o e-mail está no formato correto.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedEmail)) {
    return 'E-mail inválido.';
  }

  return true;
}
