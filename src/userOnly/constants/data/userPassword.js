/**
 * Verificações para o campo password
 */
export function userPasswordValidate(password) {
  const errors = [];
  let valid = true;

  // Remove espaços no início e no fim da senha
  password = password.trim();

  // Verifica se a senha é vazia
  if (!password) {
    valid = false;
    errors.push('A senha não pode ser vazia.');
  }

  // Verifica o comprimento da senha
  if (password.length < 6) {
    valid = false;
    errors.push('A senha deve ter pelo menos 6 caracteres.');
  } else if (password.length > 21) {
    valid = false;
    errors.push('A senha deve ter no máximo 21 caracteres.');
  }

  // Verifica se a senha contém espaços
  if (/\s/.test(password)) {
    valid = false;
    errors.push('A senha não deve conter espaços.');
  }

  // Verifica se a senha contém letras maiúsculas, minúsculas, números e caracteres especiais
  if (!/[A-Z]/.test(password)) {
    valid = false;
    errors.push('A senha deve conter pelo menos uma letra maiúscula.');
  }
  if (!/[a-z]/.test(password)) {
    valid = false;
    errors.push('A senha deve conter pelo menos uma letra minúscula.');
  }
  if (!/[0-9]/.test(password)) {
    valid = false;
    errors.push('A senha deve conter pelo menos um número.');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    valid = false;
    errors.push('A senha deve conter pelo menos um caractere especial.');
  }

  // Verifica se a senha é comum
  const commonPasswords = ['123456', 'password', '12345678', 'qwerty']; // Adicione outras senhas comuns
  if (commonPasswords.includes(password)) {
    valid = false;
    errors.push('A senha não deve ser uma senha comum.');
  }

  return {
    valid,
    errors: valid ? [] : errors
  };
}
