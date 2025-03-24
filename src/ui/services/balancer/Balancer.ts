import { IBalancer } from "./IBalancer.ts";
import { Portfolio } from "../../types/Portfolio.ts";
import { Position } from "../../types/Position.ts";

export class Balancer implements IBalancer {
  calculate(portfolio: Portfolio): Portfolio {
    const totalValue = portfolio.positions.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0,
    );
    const totalAvailable = totalValue + portfolio.balance;
    let newBalance = portfolio.balance;

    const targetValues: Record<string, number> = {};
    portfolio.positions.forEach((p) => {
      targetValues[p.ticker] = totalAvailable * (p.target / 100);
    });

    const currentValues: Record<string, number> = {};
    portfolio.positions.forEach((p) => {
      currentValues[p.ticker] = p.quantity * p.price;
    });

    const newPositions: Position[] = portfolio.positions.map((p) => ({
      ticker: p.ticker,
      quantity: p.quantity,
      price: p.price,
      target: p.target,
    }));

    let purchased: boolean;
    do {
      purchased = false;

      const buyOptions = newPositions
        .map((p) => ({
          ticker: p.ticker,
          price: p.price,
          deficit: targetValues[p.ticker] - currentValues[p.ticker],
        }))
        .filter((x) => x.deficit > 0 && newBalance >= x.price)
        .sort((a, b) => b.deficit - a.deficit);

      for (const option of buyOptions) {
        if (newBalance < option.price) {
          continue;
        }

        const position = newPositions.find((p) => p.ticker === option.ticker);
        if (position) {
          position.quantity++;
          newBalance -= option.price;
          currentValues[option.ticker] += option.price;
          purchased = true;
        }
      }
    } while (purchased);

    return { balance: newBalance, positions: newPositions };
  }
}
