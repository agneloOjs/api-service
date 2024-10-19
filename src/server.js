// server.js

import "dotenv/config";
import app from "./app.js";
import { connectDb, desconectDb } from "./config/dbService.js";
import { ERROR_MESSAGES_BR } from "./shared/I18n/pt-BR/ErrorMessagesBR.js";
import Logger from "./shared/utils/Logger.js";

class Server {
  constructor() {
    this.port = process.env.PORT;
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
        console.log(`Servidor rodando na porta ${this.port}`);
        console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
        console.log(`Data/Hora: ${new Date().toISOString()}`);
      });

      // Escutando sinal para desconectar antes de sair
      process.on("SIGINT", async () => {
        await desconectDb();
        process.exit(0);
      });
    } catch (error) {
      Logger.error(error);
      console.error(`${ERROR_MESSAGES_BR.ERROR_WHEN_STARTING_SERVER}`);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();
