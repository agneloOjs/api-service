/**
 * Schema para validar a crição do user
 */

import { userEmailValidate } from '../constants/data/userEmail.js';
import { userNameValidate } from '../constants/data/userName.js';
import { userPasswordValidate } from '../constants/data/userPassword.js';

/**
 * Validação dos dados do usuário durante a criação
 * @param {Object} userData
 * @returns {Object}
 */
export function userSchemaCreate(userData) {
  const errors = [];
  let statusCode = 200;

  // Validação do e-mail
  const emailValidation = userEmailValidate(userData.email);
  if (!emailValidation.valid) {
    errors.push(...emailValidation.errors);
    statusCode = 400;
  }

  // Validação do nome
  const nameValidation = userNameValidate(userData.name);
  if (!nameValidation.valid) {
    errors.push(...nameValidation.errors);
    statusCode = 400;
  }

  // Validação da senha
  const passwordValidation = userPasswordValidate(userData.password);
  if (!passwordValidation.valid) {
    errors.push(...passwordValidation.errors);
    statusCode = 400;
  }

  // Se houver erros, retorne o status e as mensagens
  if (errors.length > 0) {
    return {
      statusCode,
      messages: errors
    };
  }

  return {
    success: true
  };
}
