import { Provider } from "inversify-react";
import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { container } from "../src/ui/container/container.ts";
import { darkTheme } from "../src/ui/themes.ts";

export const renderWithProviders = (component: ReactNode) => {
  return render(component, {
    wrapper: ({ children }: { children: ReactNode }) => {
      return (
        <Provider container={container}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      );
    },
  });
};
