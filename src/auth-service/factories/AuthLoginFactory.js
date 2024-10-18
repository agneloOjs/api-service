import { AuthLogoutDTO } from '../dtos/AuthLogoutDTO.js';

export class AuthLogoutFactory {
  static authLogoutDTO(userId) {
    const logoutDTO = new AuthLogoutDTO(userId);
    logoutDTO.validate();
    return logoutDTO;
  }
}
