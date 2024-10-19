import UserInputDTO from '../../../../../src/userOnly/dtos/UserInputDTOs.js';
import { describe, it, expect } from 'vitest';

describe('UserInputDTO', () => {
  it('deve inicializar corretamente as propriedades do usuário', () => {
    const userMock = {
      id: 1,
      createdAt: new Date(),
      email: 'test@example.com',
      userName: 'testuser',
      active: true,
      code: 'ABC123',
      password: 'securepassword',
      createdBy: 'testuser',
      created: 'testuser'
    };

    const userInputDTO = new UserInputDTO(userMock);

    expect(userInputDTO.id).toBe(userMock.id);
    expect(userInputDTO.createdAt).toBe(userMock.createdAt);
    expect(userInputDTO.email).toBe(userMock.email);
    expect(userInputDTO.userName).toBe(userMock.userName);
    expect(userInputDTO.active).toBe(userMock.active);
    expect(userInputDTO.code).toBe(userMock.code);
    expect(userInputDTO.password).toBe(userMock.password);
    expect(userInputDTO.createdBy).toBe(userMock.createdBy);
  });
});
