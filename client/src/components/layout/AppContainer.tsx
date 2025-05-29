import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  return (
    <Box
      component={"main"}
      color={"text.primary"}
      bgcolor={"background.default"}
      height={"100%"}
      width={"100%"}
    >
      {children}
    </Box>
  );
};

export default AppContainer;
