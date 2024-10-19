import dbService, {
  conectDb,
  desconectDb,
} from "../../../../src/config/dbService.js";
import { describe, it, expect, vi } from "vitest";

// Mocking PrismaClient
vi.mock("@prisma/client", () => {
  return {
    PrismaClient: vi.fn(() => ({
      $connect: vi.fn(),
      $disconnect: vi.fn(),
    })),
  };
});

describe("Testando conexão com o banco de dados", () => {
  it("deve conectar ao banco de dados com sucesso", async () => {
    const connectSpy = vi.spyOn(dbService, "$connect").mockResolvedValueOnce();

    await conectDb();

    expect(connectSpy).toHaveBeenCalled();
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("deve lançar erro ao falhar ao conectar", async () => {
    const connectSpy = vi
      .spyOn(dbService, "$connect")
      .mockRejectedValueOnce(new Error("Falha na conexão"));

    await expect(conectDb()).rejects.toThrow("Falha na conexão");
    expect(connectSpy).toHaveBeenCalled();
  });

  it("deve desconectar do banco de dados com sucesso", async () => {
    const disconnectSpy = vi
      .spyOn(dbService, "$disconnect")
      .mockResolvedValueOnce();

    await desconectDb();

    expect(disconnectSpy).toHaveBeenCalled();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it("deve lançar erro ao falhar ao desconectar", async () => {
    const disconnectSpy = vi
      .spyOn(dbService, "$disconnect")
      .mockRejectedValueOnce(new Error("Falha ao desconectar"));

    await expect(desconectDb()).rejects.toThrow("Falha ao desconectar");
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
