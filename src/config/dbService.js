import { PrismaClient } from "@prisma/client";

const dbService = new PrismaClient();

/**
 * Função para conectar ao banco de dados.
 */
export const connectDb = async () => {
  try {
    await dbService.$connect();
    console.log("Conectado ao banco de dados.");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados.");
    throw error;
  }
};

/**
 * Função para desconectar do banco de dados.
 */
export const desconectDb = async () => {
  try {
    await dbService.$disconnect();
    console.log("Desconectado do banco de dados com sucesso.");
  } catch (error) {
    console.error("Error ao desconectar do banco de dados.");
    throw error;
  }
};

export default dbService;
