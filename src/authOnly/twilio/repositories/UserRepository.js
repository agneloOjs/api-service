/**
 * Operações do banco de dados
 * @module repositories/AuthUserTwilioRepository
 */

import dbService from '../../../config/dbService.js';

export class AuthUserTwilioRepository {
  async findByPhone(phoneNumber) {
    return dbService.user.findUnique({
      where: { phoneNumber }
    });
  }

  async create(userData) {
    return dbService.user.create({
      data: userData
    });
  }

  async updateVerificationStatus(phoneNumber, isVerified) {
    return dbService.user.update({
      where: { phoneNumber },
      data: { isVerified }
    });
  }
}
