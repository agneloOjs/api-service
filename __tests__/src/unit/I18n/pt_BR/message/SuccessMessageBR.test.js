import { describe, it, expect } from 'vitest';
import { SUCCESS_MESSAGES_BR } from '../../../../../../src/I18n/pt-BR/message/SuccessMessageBR.js';

describe('SUCCESS_MESSAGES_BR', () => {
  it('deve conter a mensagem "Empresa cadastrada com sucesso."', () => {
    expect(SUCCESS_MESSAGES_BR.COMPANY_CREATED).toBe(
      'Empresa cadastrada com sucesso.'
    );
  });

  it('deve ter todas as mensagens definidas', () => {
    expect(SUCCESS_MESSAGES_BR).toHaveProperty('COMPANY_CREATED');
  });
});
