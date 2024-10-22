import { describe, it, expect, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { passwordEncrypt } from '../../../../../src/userOnly/utils/passwordEncrypt.js';
import { I18n_USER_MESSAGE } from '../../../../../src/userOnly/I18n/pt-BR/UserModel.js';

// Mock do bcrypt
vi.mock('bcrypt');

describe('passwordEncrypt', () => {
  const mockPassword = 'securePassword123';
  const mockHashedPassword = 'hashedPassword123';

  it('deve retornar uma senha criptografada com sucesso', async () => {
    // Mock da função bcrypt.hash
    bcrypt.hash.mockResolvedValue(mockHashedPassword);

    const result = await passwordEncrypt(mockPassword);

    expect(result).toBe(mockHashedPassword); // Verifica se a senha retornada é a esperada
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10); // Verifica se bcrypt.hash foi chamado corretamente
  });

  it('deve lançar um erro se bcrypt.hash falhar', async () => {
    const errorMessage = 'Falha na criptografia';
    bcrypt.hash.mockRejectedValue(new Error(errorMessage)); // Mock da falha na função bcrypt.hash

    await expect(passwordEncrypt(mockPassword)).rejects.toThrow(
      'Erro ao criptografar a senha: ' + errorMessage
    );
  });

  it('deve lançar um erro se a senha for undefined', async () => {
    await expect(passwordEncrypt(undefined)).rejects.toThrow(
      `${I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT}`
    );
  });

  it('deve lançar um erro se a senha for null', async () => {
    await expect(passwordEncrypt(null)).rejects.toThrow(
      `${I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT}`
    );
  });

  it('deve lançar um erro se a senha não for uma string', async () => {
    const nonStringPassword = 12345; // Senha não string
    await expect(passwordEncrypt(nonStringPassword)).rejects.toThrow(
      `${I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT}`
    );
  });

  it('deve lançar um erro se o bcrypt.hash falhar', async () => {
    const password = 'minhaSenhaSecreta';
    const errorMessage = 'Falha no hash';
    bcrypt.hash.mockRejectedValue(new Error(errorMessage));

    await expect(passwordEncrypt(password)).rejects.toThrow(
      `${I18n_USER_MESSAGE.PASSWORD_ERROR_ENCRYPT}: ` + errorMessage
    );
  });
});
