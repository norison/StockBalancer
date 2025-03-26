import { makeAutoObservable } from "mobx";
import { Position } from "../types/Position.ts";
import { Portfolio } from "../types/Portfolio.ts";

export class PortfolioStore {
  private _balance: number = 0;
  private _positions: Position[] = [];
  private _currentPosition: Position | null = null;
  private _dialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  // region Getters and Setters
  public get balance(): number {
    return this._balance;
  }

  public get positions(): Position[] {
    return this._positions;
  }

  public get currentPosition(): Position | null {
    return this._currentPosition;
  }

  public get dialogOpen(): boolean {
    return this._dialogOpen;
  }

  public get totalValue() {
    return this._positions.reduce(
      (previousValue, position) =>
        previousValue + position.quantity * position.price,
      0,
    );
  }

  // endregion

  // region Actions
  public openAddDialog() {
    this._dialogOpen = true;
  }

  public updateBalance(newBalance: number) {
    this._balance = newBalance;
  }

  public loadPortfolio(portfolio: Portfolio) {
    this._balance = portfolio.balance;
    this._positions = portfolio.positions;
  }

  public get shouldCalculate() {
    return (
      this._positions.reduce((prev, position) => prev + position.target, 0) ===
      100
    );
  }

  public cancelDialog() {
    this._dialogOpen = false;
    this._currentPosition = null;
  }

  public openEditDialog(ticker: string) {
    this._currentPosition =
      this._positions.find((position) => position.ticker === ticker) ?? null;

    if (this._currentPosition === null) {
      return;
    }

    this._dialogOpen = true;
  }

  public addPosition(position: Position) {
    this._positions.push(position);
    this._dialogOpen = false;
  }

  public removePosition(ticker: string) {
    this._positions = this._positions.filter(
      (position) => position.ticker !== ticker,
    );
  }

  public editPosition(position: Position) {
    const index = this._positions.findIndex(
      (p) => p.ticker === position.ticker,
    );
    this._positions[index] = position;
    this._currentPosition = null;
    this._dialogOpen = false;
  }

  // endregion
}
