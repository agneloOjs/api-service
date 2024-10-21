/**
 * Verificações para o campo email
 */
export function userEmailValidate(email) {
  const errors = [];

  // Verifica se o e-mail foi fornecido
  if (!email || email.trim().length === 0) {
    errors.push('E-mail é obrigatório.');
    return { valid: false, errors };
  }

  // Remove espaços em branco do início e do fim
  const trimmedEmail = email.trim();

  // Verifica o comprimento do e-mail
  if (trimmedEmail.length < 12) {
    errors.push('E-mail deve ter pelo menos 12 caracteres.');
  }

  if (trimmedEmail.length > 80) {
    errors.push('E-mail deve ter no máximo 80 caracteres.');
  }

  // Expressão regular para validação do formato de e-mail
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(trimmedEmail)) {
    errors.push('Formato de e-mail inválido.');
  }

  // Verificação extra (opcional): proibir e-mails temporários ou indesejados
  const temporaryEmailDomains = [
    'mailinator.com',
    'temp-mail.org',
    '10minutemail.com',
    'guerrillamail.com'
  ];

  const emailDomain = trimmedEmail.split('@')[1];
  if (temporaryEmailDomains.includes(emailDomain)) {
    errors.push('Domínio de e-mail temporário não é permitido.');
  }

  // Retorna os erros, se houver
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Caso todas as validações passem
  return { valid: true };
}
