import { Box, Button, useColorScheme } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const { setMode } = useColorScheme();
  return (
    <Box
      component={"main"}
      bgcolor={"backgroundPrimary.main"}
      height={"100%"}
      width={"100%"}
    >
      <Button onClick={() => setMode("light")}>Tema claro</Button>
      <Button onClick={() => setMode("dark")}>Tema escuro</Button>
      {children}
    </Box>
  );
};

export default AppContainer;
