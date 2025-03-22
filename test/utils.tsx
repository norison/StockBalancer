import {Provider} from "inversify-react"
import {ReactNode} from "react";
import {render} from "@testing-library/react";
import container from "../src/ui/container/container.ts";

export const renderWithProviders = (component: ReactNode) => {
  return render(component, {
    wrapper: ({children}: { children: ReactNode }) => {
      return <Provider container={container}>{children}</Provider>;
    }
  });
};
