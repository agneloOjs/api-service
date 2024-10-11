import { describe, it, expect, vi } from 'vitest';
import CompanyCreateController from '../../../../../src/controllers/company/CompanyCreateController.js';
import CompanyCreateService from '../../../../../src/services/company/CompanyCreateService.js';
import Logger from '../../../../../src/constants/Logger.js';
import { ERROR_MESSAGES } from '../../../../../src/constants/ErrorMessages.js';

// Mock do CompanyCreateService
vi.mock('../../../../../src/services/company/CompanyCreateService.js');

describe('CompanyCreateController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new CompanyCreateController(); // Instancia o controller
    req = {
      body: { name: 'Empresa Teste' } // Dados da requisição
    };
    res = {
      status: vi.fn().mockReturnThis(), // Mock da função status
      json: vi.fn() // Mock da função json
    };
  });

  it('deve criar uma nova empresa e retornar status 201', async () => {
    const newCompany = { success: true, id: 1, name: 'Empresa Teste' };
    CompanyCreateService.prototype.createCompany.mockResolvedValue(newCompany);

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newCompany);
  });

  it('deve retornar status 400 se a criação da empresa falhar', async () => {
    const errorResponse = {
      success: false,
      message: 'Erro ao criar a empresa'
    };
    CompanyCreateService.prototype.createCompany.mockResolvedValue(
      errorResponse
    );

    await controller.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorResponse.message });
  });

  it('deve retornar status 500 se ocorrer um erro inesperado', async () => {
    const errorMessage = 'Erro inesperado';
    CompanyCreateService.prototype.createCompany.mockImplementation(() => {
      throw new Error(errorMessage); // Lança um erro
    });

    const logSpy = vi.spyOn(Logger, 'error'); // Espiona a função de log

    await controller.create(req, res);

    expect(logSpy).toHaveBeenCalledWith(expect.any(Error)); // Verifica se o erro foi logado
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      erro: `${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}`
    });
  });
});
