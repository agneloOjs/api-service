/**
 * Rotas Privadas user
 * @module routes/private
 */
import { Router } from 'express';
import UsersGetAllUserController from '../controllers/UsersGetAll.js';

const userPrivateRoutes = Router();
const usersGetAllUserController = new UsersGetAllUserController();

/**
 * Instancia a classe do controller
 */

/**
 * Rota para registrar usuário
 */
userPrivateRoutes.get(
  '/usuarios',
  usersGetAllUserController.getAll.bind(UsersGetAllUserController)
);

export default userPrivateRoutes;
