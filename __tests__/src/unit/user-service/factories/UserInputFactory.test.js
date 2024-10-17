import { expect, describe, it } from 'vitest';
import UserInputFactory from '../../../../../src/user-service/factories/UserInputFactory.js';
import UserInputDTO from '../../../../../src/user-service/dtos/UserInputDTO.js';


describe('UserInputFactory', () => { 
  // Define um bloco de testes para a classe UserInputFactory.
  it('deve criar uma instância de UserInputDTO com dados válidos', () => { 
    // Define um teste individual que verifica a criação de uma instância de UserInputDTO com dados válidos.
    const userData = {
      id: '123',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
      active: true,
      code: 12345,
    };

    // Chama o método estático userInputDTO da classe UserInputFactory,
    const userDTO = UserInputFactory.userInputDTO(userData); 

    // Verifica se o objeto userDTO é uma instância da classe UserInputDTO.
    expect(userDTO).toBeInstanceOf(UserInputDTO); 
    // Verifica se a propriedade id do objeto userDTO é igual à propriedade id do objeto userData.
    expect(userDTO.id).toBe(userData.id); 
    // Verifica se a propriedade email do objeto userDTO é igual à propriedade email do objeto userData.
    expect(userDTO.email).toBe(userData.email); 
  });
});
