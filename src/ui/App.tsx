import { FC } from "react";
import { observer } from "mobx-react-lite";
import { container } from "./container/container.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme.ts";
import { Provider } from "inversify-react";
import MainPage from "./pages/MainPage.tsx";

const App: FC = observer(() => {
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
