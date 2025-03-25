import { makeAutoObservable } from "mobx";
import { Position } from "../types/Position.ts";

export class PortfolioStore {
  public balance: number = 0;
  public positions: Position[] = [];
  public currentPosition: Position | null = null;
  public dialogOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  public cancelDialog() {
    this.dialogOpen = false;
    this.currentPosition = null;
  }

  public get totalValue() {
    return this.positions.reduce(
      (previousValue, position) =>
        previousValue + position.quantity * position.price,
      0,
    );
  }

  public get shouldCalculate() {
    return (
      this.positions.reduce((prev, position) => prev + position.target, 0) ===
      100
    );
  }

  public openEditDialog(ticker: string) {
    this.currentPosition =
      this.positions.find((position) => position.ticker === ticker) ?? null;

    if (this.currentPosition === null) {
      return;
    }

    this.dialogOpen = true;
  }

  public addPosition(position: Position) {
    this.positions.push(position);
    this.dialogOpen = false;
  }

  public removePosition(ticker: string) {
    this.positions = this.positions.filter(
      (position) => position.ticker !== ticker,
    );
  }

  public editPosition(position: Position) {
    const index = this.positions.findIndex((p) => p.ticker === position.ticker);
    this.positions[index] = position;
    this.currentPosition = null;
    this.dialogOpen = false;
  }
}
