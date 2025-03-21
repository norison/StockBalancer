import {Portfolio} from "./models/Portfolio.ts";

export interface IBalancer {
  calculate(portfolio: Portfolio): Portfolio;
}