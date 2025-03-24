import { ContainerModule, Container } from "inversify";
import { Identifiers } from "./types.ts";
import { IBalancer } from "../services/balancer/IBalancer.ts";
import { Balancer } from "../services/balancer/Balancer.ts";

const appModule = new ContainerModule((bind) => {
  bind<IBalancer>(Identifiers.Balancer).to(Balancer);
});

const container = new Container();
container.load(appModule);

export default container;
