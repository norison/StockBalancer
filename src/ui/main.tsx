import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "inversify-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { PortfolioProvider, store } from "./stores/PortfolioStore.ts";
import container from "./container/container.ts";
import { theme } from "./theme.ts";
import App from "./App.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider container={container}>
      <ThemeProvider theme={theme}>
        <PortfolioProvider value={store}>
          <CssBaseline />
          <App />
        </PortfolioProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
