export interface IStorage {
  savePortfolio(portfolio: Portfolio): Promise<void>;

  loadPortfolio(): Promise<Portfolio>;
}
