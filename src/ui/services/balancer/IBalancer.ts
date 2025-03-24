import {Portfolio} from "../../types/Portfolio.ts";

export interface IBalancer {
  calculate(portfolio: Portfolio): Portfolio;
}