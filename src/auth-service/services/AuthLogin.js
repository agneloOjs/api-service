import AuthLoginRepository from '../repositories/AuthLogin.js';

export default class AuthLoginService {
  constructor() {
    this.authLoginRepository = null; // Inicializa como null
  }

  async loginService(email, password, ipAddress, deviceId, deviceType) {
    try {
      // Criando uma instância de AuthLoginRepository com os parâmetros necessários
      this.authLoginRepository = new AuthLoginRepository(
        email,
        password,
        ipAddress,
        deviceId,
        deviceType
      );

      // Chamando o método authenticate do repositório
      const result = await this.authLoginRepository.authenticate();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Erro durante a autenticação');
    }
  }
}
