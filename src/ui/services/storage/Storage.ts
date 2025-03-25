import { IStorage } from "./IStorage.ts";
import { Portfolio } from "../../types/Portfolio.ts";

export class Storage implements IStorage {
  private readonly _portfolioKey: string = "portfolio";

  public async savePortfolio(portfolio: Portfolio): Promise<void> {
    await window.electron.store.set(
      this._portfolioKey,
      JSON.stringify(portfolio),
    );
  }

  public async getPortfolio(): Promise<Portfolio> {
    return JSON.parse(await window.electron.store.get(this._portfolioKey));
  }
}
