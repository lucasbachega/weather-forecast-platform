import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
      disableCssColorScheme: true,
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
    },
    components: {
      MuiTypography: {
        defaultProps: {
          color: "text.primary",
        },
      },
    },
    colorSchemes: {
      light: {
        palette: {
          backgroundPrimary: {
            main: "#e7e7e7",
          },
          text: {
            primary: "#0D0D0D",
            secondary: "#69666F",
          },
        },
      },
      dark: {
        palette: {
          backgroundPrimary: {
            main: "#000",
          },
          text: {
            primary: "#FFF",
            secondary: "#EBE9F0",
          },
        },
      },
    },
  })
);
