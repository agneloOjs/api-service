import UserCreateService from '../services/UserCreate.js';
import Logger from '../../shared/utils/Logger.js';

export default class UserCreateController {
  constructor() {
    this.userCreateService = new UserCreateService();
  }

  /**
   * @param {Object} req
   * @param {Object} req.body
   * @param {Object} res
   * @returns {Promise<Object>}
   * @throws {Error}
   */

  create = async (req, res) => {
    try {
      const newUser = await this.userCreateService.createUser(req.body);

      if (newUser.success) {
        return res.status(201).json(newUser);
      } else {
        return res.status(400).json({ error: newUser.message });
      }
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({ erro: 'Erro no servidor.' });
    }
  };
}
