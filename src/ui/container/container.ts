import { ContainerModule, Container } from "inversify";
import { Identifiers } from "./identifiers.ts";
import { IBalancer } from "../services/balancer/IBalancer.ts";
import { Balancer } from "../services/balancer/Balancer.ts";
import { PortfolioStore } from "../stores/PortfolioStore.ts";
import { IStorage } from "../services/storage/IStorage.ts";
import { Storage } from "../services/storage/Storage.ts";
import { ThemeStore } from "../stores/ThemeStore.ts";

const appModule = new ContainerModule((bind) => {
  bind<IBalancer>(Identifiers.Balancer).to(Balancer).inSingletonScope();
  bind<IStorage>(Identifiers.Storage).to(Storage).inSingletonScope();
  bind<PortfolioStore>(Identifiers.PortfolioStore)
    .to(PortfolioStore)
    .inSingletonScope();
  bind<ThemeStore>(Identifiers.ThemeStore).to(ThemeStore).inSingletonScope();
});

export const container = new Container();
container.load(appModule);

export const usePortfolioStore = () =>
  container.get<PortfolioStore>(Identifiers.PortfolioStore);
export const useThemeStore = () =>
  container.get<ThemeStore>(Identifiers.ThemeStore);

export const useStorage = () => container.get<IStorage>(Identifiers.Storage);
export const useBalancer = () => container.get<IBalancer>(Identifiers.Balancer);
