/**
 * Verificações para o campo userName
 */
export function userNameValidate(userName) {
  const errors = [];

  // Verifica se o nome foi fornecido
  if (!userName || userName.trim().length === 0) {
    errors.push('Nome é obrigatório.');
  }

  // Remove espaços em branco do início e fim
  const trimmedName = userName.trim();

  // Verifica tamanho mínimo
  if (trimmedName.length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres.');
  }

  // Verifica tamanho máximo
  if (trimmedName.length > 80) {
    errors.push('Nome deve ter no máximo 80 caracteres.');
  }

  // Verifica se contém apenas letras, espaços, hífens, acentos e apóstrofos
  const validNamePattern = /^[a-zA-Zà-úÀ-Ú' -]+$/;
  if (!validNamePattern.test(trimmedName)) {
    errors.push('Nome contém caracteres inválidos.');
  }

  // Retorna os erros, se houver
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Caso todas as validações passem
  return { valid: true };
}
