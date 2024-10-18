import { AuthLoginDTO } from '../dtos/AuthLoginDTO.js';

export class AuthFactory {
  static authLoginDTO(email, password) {
    const loginDTO = new AuthLoginDTO(email, password);
    loginDTO.validate();
    return loginDTO;
  }
}
