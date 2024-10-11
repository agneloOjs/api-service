import { CheckSpecialCharacters } from '../../../../src/validators/CheckHasSpecialCharacters.js';

describe('CheckSpecialCharacters', () => {
  it('deve retornar true quando a string não contém caracteres especiais', () => {
    const result = CheckSpecialCharacters('valorValido', 'Campo');
    expect(result).toBe(true);
  });

  it('deve retornar uma mensagem de erro quando a string contém caracteres especiais', () => {
    const result = CheckSpecialCharacters('valor@Inválido', 'Campo');
    expect(result).toBe('Campo não pode conter caracteres especiais.');
  });

  it('deve retornar uma mensagem de erro quando a string contém espaços e caracteres especiais', () => {
    const result = CheckSpecialCharacters('valor inválido!', 'Campo');
    expect(result).toBe('Campo não pode conter caracteres especiais.');
  });

  it('deve retornar true quando a string está vazia', () => {
    const result = CheckSpecialCharacters('', 'Campo');
    expect(result).toBe(true);
  });
});
