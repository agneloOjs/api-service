import { Router } from 'express';
import UserCreateController from '../controllers/UserCreate.js';

const UserPublicRoutes = Router();

/**
 * Instancia a classe do construtor.
 */
const userCreateController = new UserCreateController();

/**
 * Rotas publicas para usuário.
 */
UserPublicRoutes.post(
  '/criar-cadastro',
  userCreateController.create.bind(UserCreateController)
);

export default UserPublicRoutes;
