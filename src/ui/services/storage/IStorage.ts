import { Portfolio } from "../../types/Portfolio.ts";

export interface IStorage {
  savePortfolio(portfolio: Portfolio): Promise<void>;

  getPortfolio(): Promise<Portfolio>;
}
