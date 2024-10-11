import { CheckIsFieldEmpty } from '../../../../src/validators/CheckIsFieldEmpty.js';
import { INVALID_OR_EMPTY_MESSAGES } from '../../../../src/constants/ErrorMessages.js';

describe('CheckIsFieldEmpty', () => {
  it('deve retornar true quando o campo contém um valor válido', () => {
    const result = CheckIsFieldEmpty('valor válido', 'campo');
    expect(result).toBe(true);
  });

  it('deve retornar uma mensagem de erro quando o campo está vazio', () => {
    const result = CheckIsFieldEmpty('', 'campo');
    expect(result).toBe(`campo ${INVALID_OR_EMPTY_MESSAGES.NOT_EMPTY_FIELD}`);
  });

  it('deve retornar uma mensagem de erro quando o campo contém apenas espaços em branco', () => {
    const result = CheckIsFieldEmpty('   ', 'campo');
    expect(result).toBe(`campo ${INVALID_OR_EMPTY_MESSAGES.NOT_EMPTY_FIELD}`);
  });

  it('deve retornar uma mensagem de erro quando o campo é undefined', () => {
    const result = CheckIsFieldEmpty(undefined, 'campo');
    expect(result).toBe(`campo ${INVALID_OR_EMPTY_MESSAGES.NOT_EMPTY_FIELD}`);
  });

  it('deve retornar uma mensagem de erro quando o campo é null', () => {
    const result = CheckIsFieldEmpty(null, 'campo');
    expect(result).toBe(`campo ${INVALID_OR_EMPTY_MESSAGES.NOT_EMPTY_FIELD}`);
  });
});
