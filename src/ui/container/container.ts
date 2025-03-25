import { ContainerModule, Container } from "inversify";
import { Identifiers } from "./identifiers.ts";
import { IBalancer } from "../services/balancer/IBalancer.ts";
import { Balancer } from "../services/balancer/Balancer.ts";
import { PortfolioStore } from "../stores/PortfolioStore.ts";

const appModule = new ContainerModule((bind) => {
  bind<IBalancer>(Identifiers.Balancer).to(Balancer);
  bind<PortfolioStore>(Identifiers.PortfolioStore).to(PortfolioStore);
});

export const container = new Container();
container.load(appModule);

export const usePortfolio = () =>
  container.get<PortfolioStore>(Identifiers.PortfolioStore);
export const useBalancer = () => container.get<IBalancer>(Identifiers.Balancer);
