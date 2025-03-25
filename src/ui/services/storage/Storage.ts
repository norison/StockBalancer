import { IStorage } from "./IStorage.ts";

export class Storage implements IStorage {
  private readonly _portfolioKey: string = "portfolio";

  public async savePortfolio(portfolio: Portfolio): Promise<void> {
    await window.electron.store.set(this._portfolioKey, portfolio);
  }

  public async loadPortfolio(): Promise<Portfolio> {
    return await window.electron.store.get(this._portfolioKey);
  }
}
