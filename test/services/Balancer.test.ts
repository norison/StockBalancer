import { Balancer } from "../../src/ui/services/balancer/Balancer";

describe("Balancer", () => {
  const balancer = new Balancer();

  it("should return the same portfolio if no balance and no target percentages", () => {
    const portfolio: Portfolio = {
      balance: 0,
      positions: [
        { ticker: "AAPL", quantity: 10, price: 150, target: 0 },
        { ticker: "GOOGL", quantity: 5, price: 100, target: 0 },
      ],
    };

    const result = balancer.calculate(portfolio);
    expect(result).toEqual(portfolio);
  });

  it("should distribute balance according to target percentages", () => {
    const portfolio: Portfolio = {
      balance: 1000,
      positions: [
        { ticker: "AAPL", quantity: 10, price: 150, target: 50 },
        { ticker: "GOOGL", quantity: 5, price: 100, target: 50 },
      ],
    };

    const result = balancer.calculate(portfolio);
    expect(result.balance).toBe(0);
    expect(result.positions.find((p) => p.ticker === "AAPL")?.quantity).toBe(
      10,
    );
    expect(result.positions.find((p) => p.ticker === "GOOGL")?.quantity).toBe(
      15,
    );
  });

  it("should skip buying positions if balance is less than the price of any position", () => {
    const portfolio: Portfolio = {
      balance: 140,
      positions: [
        { ticker: "AAPL", quantity: 10, price: 150, target: 50 },
        { ticker: "GOOGL", quantity: 5, price: 100, target: 30 },
        { ticker: "AMZN", quantity: 0, price: 50, target: 20 },
      ],
    };

    const result = balancer.calculate(portfolio);
    expect(result.balance).toBe(40);
    expect(result.positions.find((p) => p.ticker === "AAPL")?.quantity).toBe(
      10,
    );
    expect(result.positions.find((p) => p.ticker === "GOOGL")?.quantity).toBe(
      5,
    );
    expect(result.positions.find((p) => p.ticker === "AMZN")?.quantity).toBe(2);
  });

  it("should not buy more if balance is insufficient", () => {
    const portfolio: Portfolio = {
      balance: 50,
      positions: [
        { ticker: "AAPL", quantity: 10, price: 150, target: 50 },
        { ticker: "GOOGL", quantity: 5, price: 100, target: 50 },
      ],
    };

    const result = balancer.calculate(portfolio);
    expect(result.balance).toBe(50);
    expect(result.positions.find((p) => p.ticker === "AAPL")?.quantity).toBe(
      10,
    );
    expect(result.positions.find((p) => p.ticker === "GOOGL")?.quantity).toBe(
      5,
    );
  });

  it("should handle empty positions", () => {
    const portfolio: Portfolio = {
      balance: 1000,
      positions: [],
    };

    const result = balancer.calculate(portfolio);
    expect(result.balance).toBe(1000);
    expect(result.positions.length).toBe(0);
  });
});
