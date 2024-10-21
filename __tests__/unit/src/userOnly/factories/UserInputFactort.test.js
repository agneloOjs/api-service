// __tests__/unit/src/UserInputFactory.test.js
import UserInputFactory from '../../../../../src/userOnly/factories/UserInputFactory.js';
import UserInputDTO from '../../../../../src/userOnly/dtos/UserInputDTO.js';
import { describe, it, expect } from 'vitest';

describe('UserInputFactory', () => {
  it('deve criar uma instância de UserInputDTO a partir de um objeto user válido', () => {
    const user = {
      id: 1,
      createdAt: new Date(),
      email: 'user@example.com',
      userName: 'username',
      active: true,
      code: '123456',
      password: 'password123',
      createdBy: 'admin'
    };

    const userInputDTO = UserInputFactory.userInputDTO(user);

    expect(userInputDTO).toBeInstanceOf(UserInputDTO);
    expect(userInputDTO.id).toBe(user.id);
    expect(userInputDTO.createdAt).toBe(user.createdAt);
    expect(userInputDTO.email).toBe(user.email);
    expect(userInputDTO.userName).toBe(user.userName);
    expect(userInputDTO.active).toBe(user.active);
    expect(userInputDTO.code).toBe(user.code);
    expect(userInputDTO.password).toBe(user.password);
    expect(userInputDTO.createdBy).toBe(user.createdBy);
  });
});
