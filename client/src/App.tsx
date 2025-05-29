import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import Hello from "./components/Hello";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      disableTransitionOnChange
      noSsr
    >
      <Box bgcolor={"background.default"} height={"100%"} width={"100%"}>
        <Hello />
      </Box>
    </ThemeProvider>
  );
}

export default App;
