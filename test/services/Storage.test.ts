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
});
