import { IStorage } from "./IStorage.ts";
import { Portfolio } from "../../types/Portfolio.ts";

export class Storage implements IStorage {
  public async saveTheme(theme: "light" | "dark"): Promise<void> {
    await window.electron.store.set("theme", theme);
  }

  public async getTheme(): Promise<"light" | "dark"> {
    const theme = await window.electron.store.get("theme");
    return theme ? (theme as "light" | "dark") : "light";
  }

  private readonly _portfolioKey: string = "portfolio";

  public async savePortfolio(portfolio: Portfolio): Promise<void> {
    await window.electron.store.set(
      this._portfolioKey,
      JSON.stringify(portfolio),
    );
  }

  public async getPortfolio(): Promise<Portfolio> {
    const json = await window.electron.store.get(this._portfolioKey);
    return json ? JSON.parse(json) : null;
  }
}
