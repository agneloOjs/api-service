/**
 * Rotas Privadas user
 * @module routes/private
 */
import { Router } from 'express';
import UserCreateController from '../controllers/UserCreate.js';

const userPrivateRoutes = Router();
const userCreateController = new UserCreateController();

/**
 * Instancia a classe do controller
 */

/**
 * Rota para registrar usuário
 */
userPrivateRoutes.post(
  '/criar-cadastro',
  userCreateController.create.bind(UserCreateController)
);

export default userPrivateRoutes;
