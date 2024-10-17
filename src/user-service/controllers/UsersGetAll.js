 
import UsersGetAllService from "../services/UserGetAll.js";

export default class UsersGetAllUserController {
  constructor() {
    this.usersGetAllService = new UsersGetAllService();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req, res) {
    try {
      const users = await this.usersGetAllService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar os usuários.' });
    }
  }  
}
