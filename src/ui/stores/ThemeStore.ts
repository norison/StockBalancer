import { makeAutoObservable } from "mobx";
import { inject } from "inversify";
import { Identifiers } from "../container/identifiers.ts";
import { type IStorage } from "../services/storage/IStorage.ts";

export class ThemeStore {
  private _theme: "light" | "dark" = "light";

  constructor(
    @inject(Identifiers.Storage) private readonly _storage: IStorage,
  ) {
    makeAutoObservable(this);
  }

  public get theme(): "light" | "dark" {
    return this._theme;
  }

  public async init(): Promise<void> {
    this._theme = await this._storage.getTheme();
  }

  public async setTheme(theme: "light" | "dark"): Promise<void> {
    this._theme = theme;
    await this._storage.saveTheme(theme);
  }
}
