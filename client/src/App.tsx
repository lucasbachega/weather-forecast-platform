import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      disableTransitionOnChange
      noSsr
    >
      <Box
        component={"main"}
        color={"text.primary"}
        bgcolor={"background.default"}
        height={"100%"}
        width={"100%"}
      >
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
