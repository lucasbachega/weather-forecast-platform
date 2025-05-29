import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: '"Inter", sans-serif',
    },
    colorSchemes: {
      dark: true,
    },
  })
);
