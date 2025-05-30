import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppContainer from "./components/layout/AppContainer";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./store";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider
        theme={theme}
        defaultMode="system"
        disableTransitionOnChange
        noSsr
      >
        <CssBaseline />
        <BrowserRouter>
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
