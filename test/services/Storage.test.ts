import { Portfolio } from "../../src/ui/types/Portfolio.ts";
import { Storage } from "../../src/ui/services/storage/Storage.ts";

const mockStore = {
  set: vi.fn(),
  get: vi.fn(),
};

window.electron = {
  store: mockStore,
};

describe("Storage", () => {
  const storage: Storage = new Storage();
  const portfolio: Portfolio = {
    balance: 100,
    positions: [
      { ticker: "AAPL", quantity: 10, price: 100, target: 50 },
      { ticker: "GOOGL", quantity: 5, price: 200, target: 50 },
    ],
  };

  it("should save portfolio", async () => {
    await storage.savePortfolio(portfolio);
    expect(mockStore.set).toHaveBeenCalledWith(
      "portfolio",
      JSON.stringify(portfolio),
    );
  });

  it("should get portfolio", async () => {
    mockStore.get.mockResolvedValueOnce(JSON.stringify(portfolio));
    const result = await storage.getPortfolio();
    expect(result).toEqual(portfolio);
    expect(mockStore.get).toHaveBeenCalledWith("portfolio");
  });

  it("when no portfolio is saved, should return null", async () => {
    mockStore.get.mockResolvedValueOnce(null);
    const result = await storage.getPortfolio();
    expect(result).toBeNull();
    expect(mockStore.get).toHaveBeenCalledWith("portfolio");
  });

  it("should save darkTheme", async () => {
    await storage.saveTheme("dark");
    expect(mockStore.set).toHaveBeenCalledWith("theme", "dark");
  });

  it("should get darkTheme", async () => {
    mockStore.get.mockResolvedValueOnce("dark");
    const result = await storage.getTheme();
    expect(result).toEqual("dark");
    expect(mockStore.get).toHaveBeenCalledWith("theme");
  });

  it("when no darkTheme is saved, should return 'light'", async () => {
    mockStore.get.mockResolvedValueOnce(null);
    const result = await storage.getTheme();
    expect(result).toEqual("light");
    expect(mockStore.get).toHaveBeenCalledWith("theme");
  });
});
