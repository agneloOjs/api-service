/**
 * Inicialização do servidor.
 * @module server
 */

import 'dotenv/config';
import app from './app.js';
import { connectDb } from './config/dbService.js';
import { ERROR_MESSAGES_BR } from './I18n/pt-BR/message/ErrorMessagesBR.js';

class Server {
  constructor() {
    this.port = process.env.PORT || 8000;
    this.url = process.env.CORS_ORIGIN;
  }

  /**
   * Inicia o servidor
   */
  async start() {
    try {
      // Conecta ao banco de dados antes de iniciar o servidor.
      await connectDb();

      // Inicia o servidor após a conexão com o banco de dados.
      app.listen(this.port, () => {
        console.log(`Servidor rodando na porta ${this.url}:${this.port}`);
        console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Data/Hora: ${new Date().toDateString()}`);
      });
    } catch (error) {
      console.error(`${ERROR_MESSAGES_BR.ERROR_WHEN_STARTING_SERVER}`);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
