import dbService from '../../config/dbService.js';
import { generateTokenAccess } from '../utils/generateTokenAccess.js';
import { passwordCompare } from '../utils/passwordCompare.js';

export default class AuthLoginRepository {
  constructor(email, password, ipAddress, deviceId, deviceType) {
    this.email = email;
    this.password = password;
    this.ipAddress = ipAddress;
    this.deviceId = deviceId;
    this.deviceType = deviceType;
  }

  async authenticate() {
    // Buscando o usuário pelo email
    const user = await dbService.user.findUnique({
      where: { email: this.email }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificação da senha
    const isPasswordValid = await passwordCompare(this.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Senha incorreta.');
    }

    // Revogando todos os tokens antigos do usuário
    await dbService.userToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true }
    });

    // Gerando um novo token
    const token = await generateTokenAccess({ id: user.id, role: user.role });

    // Salvando o token no banco de dados
    await dbService.userToken.create({
      data: {
        userId: user.id,
        accessToken: token,
        expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hora de expiração
        ipAddress: this.ipAddress,
        deviceId: this.deviceId,
        deviceType: this.deviceType
      }
    });

    // Retornando o token gerado
    return {
      token
    };
  }
}
