import { describe, it, expect, beforeEach } from "vitest";
import { PortfolioStore } from "../../src/ui/stores/PortfolioStore.ts";
import { Position } from "../../src/ui/types/Position.ts";

describe("PortfolioStore", () => {
  let store: PortfolioStore;

  beforeEach(() => {
    store = new PortfolioStore();
  });

  it("initializes with default values", () => {
    expect(store.balance).toBe(0);
    expect(store.positions).toEqual([]);
    expect(store.dialogOpen).toBe(false);
    expect(store.currentPosition).toBeNull();
  });

  it("sets and gets balance", () => {
    store.balance = 100;
    expect(store.balance).toBe(100);
  });

  it("adds a position", () => {
    const position: Position = {
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    };
    store.addPosition(position);
    expect(store.dialogOpen).toBe(false);
    expect(store.positions).toHaveLength(1);
    expect(store.positions[0].ticker).toBe(position.ticker);
    expect(store.positions[0].quantity).toBe(position.quantity);
    expect(store.positions[0].price).toBe(position.price);
    expect(store.positions[0].target).toBe(position.target);
  });

  it("removes a position", () => {
    const position: Position = {
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    };
    store.addPosition(position);
    store.removePosition("AAPL");
    expect(store.positions).toHaveLength(0);
  });

  it("edits a position", () => {
    const position: Position = {
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    };
    store.addPosition(position);
    const updatedPosition: Position = {
      ticker: "AAPL",
      quantity: 20,
      price: 200,
      target: 60,
    };
    store.editPosition(updatedPosition);
    expect(store.currentPosition).toBeNull();
    expect(store.dialogOpen).toBe(false);
    expect(store.positions).toHaveLength(1);
    expect(store.positions[0].ticker).toBe(updatedPosition.ticker);
    expect(store.positions[0].quantity).toBe(updatedPosition.quantity);
    expect(store.positions[0].price).toBe(updatedPosition.price);
    expect(store.positions[0].target).toBe(updatedPosition.target);
  });

  it("opens and cancels the dialog", () => {
    store.dialogOpen = true;
    expect(store.dialogOpen).toBe(true);
    store.cancelDialog();
    expect(store.dialogOpen).toBe(false);
    expect(store.currentPosition).toBeNull();
  });

  it("opens edit dialog with a specific position", () => {
    const position: Position = {
      ticker: "AAPL",
      quantity: 10,
      price: 150,
      target: 50,
    };
    store.addPosition(position);
    store.openEditDialog("AAPL");
    expect(store.dialogOpen).toBe(true);
    expect(store.currentPosition).toEqual(position);
  });

  it("opens edit dialog with a specific position but it was not found", () => {
    store.openEditDialog("AAPL");
    expect(store.dialogOpen).toBe(false);
    expect(store.currentPosition).toBeNull();
  });

  it("calculates total value of positions", () => {
    store.addPosition({ ticker: "AAPL", quantity: 10, price: 150, target: 50 });
    store.addPosition({
      ticker: "GOOGL",
      quantity: 5,
      price: 2000,
      target: 50,
    });
    expect(store.totalValue).toBe(11500);
  });

  it("checks if positions should be calculated", () => {
    store.addPosition({ ticker: "AAPL", quantity: 10, price: 150, target: 50 });
    store.addPosition({
      ticker: "GOOGL",
      quantity: 5,
      price: 2000,
      target: 50,
    });
    expect(store.shouldCalculate).toBe(true);
  });
});
