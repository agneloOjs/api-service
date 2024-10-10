/**
 * Configuração principal da aplicação.
 * @module app
 */

import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import routes from './routes/base.routes.js';
import { ERROR_MESSAGES } from './constants/ErrorMessages.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Configuração de segurança e parse.
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true
      })
    );

    //Logs de requisição.
    if (env.NODE_ENV !== 'production') {
      this.app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
      });
    }
  }

  routes() {
    this.app.use('/api', routes);

    // Tratamento para rotas não encontradas.
    this.app.use('*', (req, res) => {
      res.status(404).json({
        status: 'error',
        message: `Rota ${req.originalUrl} não encontrada.`
      });
    });

    // Middleware de tratamento de erros.
    this.app.use((err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        status: 'error',
        message: err.message || `${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}`
      });
      next();
    });
  }
}

export default new App().app;
