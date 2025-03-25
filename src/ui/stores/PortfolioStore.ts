import { Portfolio } from "../types/Portfolio.ts";
import { makeAutoObservable } from "mobx";
import { Position } from "../types/Position.ts";

export class PortfolioStore {
  private _portfolio: Portfolio = {
    balance: 0,
    positions: [],
  };

  private _currentPosition: Position | null = null;
  private _dialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  public get positions() {
    return this._portfolio.positions;
  }

  public get balance() {
    return this._portfolio.balance;
  }

  public set balance(value: number) {
    this._portfolio.balance = value;
  }

  public get dialogOpen() {
    return this._dialogOpen;
  }

  public cancelDialog() {
    this._dialogOpen = false;
    this._currentPosition = null;
  }

  public get totalValue() {
    return this._portfolio.positions.reduce(
      (previousValue, position) =>
        previousValue + position.quantity * position.price,
      0,
    );
  }

  public get shouldCalculate() {
    return (
      this._portfolio.positions.reduce(
        (prev, position) => prev + position.target,
        0,
      ) === 100
    );
  }

  public get currentPosition() {
    return this._currentPosition;
  }

  public openAddDialog() {
    this._dialogOpen = true;
  }

  public openEditDialog(ticker: string) {
    this._currentPosition =
      this._portfolio.positions.find(
        (position) => position.ticker === ticker,
      ) ?? null;

    if (this._currentPosition === null) {
      return;
    }

    this._dialogOpen = true;
  }

  public addPosition(position: Position) {
    this._portfolio.positions.push(position);
    this._dialogOpen = false;
  }

  public removePosition(ticker: string) {
    this._portfolio.positions = this._portfolio.positions.filter(
      (position) => position.ticker !== ticker,
    );
  }

  public editPosition(position: Position) {
    const index = this._portfolio.positions.findIndex(
      (p) => p.ticker === position.ticker,
    );
    this._portfolio.positions[index] = position;
    this._currentPosition = null;
    this._dialogOpen = false;
  }
}
