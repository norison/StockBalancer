import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  container,
  usePortfolioStore,
  useStorage,
} from "./container/container.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import { Provider } from "inversify-react";
import MainPage from "./pages/MainPage.tsx";

const App: FC = observer(() => {
  const storage = useStorage();
  const portfolioStore = usePortfolioStore();

  useEffect(() => {
    storage.getPortfolio().then((portfolio) => {
      if (portfolio) {
        portfolioStore.loadPortfolio(portfolio);
      }
    });
  }, [storage, portfolioStore]);

  return (
    <Provider container={container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
});

export default App;
