import Logger from "../../../../../src/shared/utils/Logger.js";
import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";

describe("Logger", () => {
  beforeAll(() => {
    // Mocks para os métodos do logger
    vi.spyOn(Logger, "info").mockImplementation(() => {});
    vi.spyOn(Logger, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("deve registrar uma mensagem de info", () => {
    const message = "Mensagem de teste info";

    Logger.info(message);

    expect(Logger.info).toHaveBeenCalledWith(message);
  });

  it("deve registrar uma mensagem de erro", () => {
    const errorMessage = "Mensagem de erro teste";

    Logger.error(errorMessage);

    expect(Logger.error).toHaveBeenCalledWith(errorMessage);
  });
});
