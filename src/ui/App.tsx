import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  container,
  usePortfolioStore,
  useStorage,
  useThemeStore,
} from "./container/container.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./themes.ts";
import { Provider } from "inversify-react";
import MainPage from "./pages/MainPage.tsx";

const App: FC = observer(() => {
  const storage = useStorage();
  const portfolioStore = usePortfolioStore();
  const themeStore = useThemeStore();

  useEffect(() => {
    storage.getPortfolio().then((portfolio) => {
      if (portfolio) {
        portfolioStore.loadPortfolio(portfolio);
      }
    });
  }, [storage, portfolioStore]);

  useEffect(() => {
    themeStore.init();
  }, [themeStore]);

  return (
    <Provider container={container}>
      <ThemeProvider
        theme={themeStore.theme === "light" ? lightTheme : darkTheme}
      >
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
});

export default App;
