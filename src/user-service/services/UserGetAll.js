import UserGetAllRepository from "../repositories/userGetAll.js";
import UserResFectory from "../factories/UserResFectory.js";
export default class UsersGetAllService {
  constructor() {
    this.userGetAllRepository = new UserGetAllRepository();
  }

  async getAllUsers() {
    const users = await this.userGetAllRepository.findAll();
    return UserResFectory.userResDTO(users);
  }  
}
