import { expect, describe, it } from 'vitest';
import UserInputDTO from '../../../../../src/user-service/dtos/UserInputDTO.js';

describe('UserInputDTO', () => {
  it('deve criar uma instância do DTO com as propriedades corretas', () => {
    const userData = {
      id: '123',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      active: true,
      code: 12345,
    };

    const userDTO = new UserInputDTO(userData);

    expect(userDTO.id).toBe(userData.id);
    expect(userDTO.email).toBe(userData.email);
    expect(userDTO.userName).toBe(userData.userName);
    expect(userDTO.password).toBe(userData.password);
    expect(userDTO.active).toBe(userData.active);
    expect(userDTO.code).toBe(userData.code);
  });
  
});
