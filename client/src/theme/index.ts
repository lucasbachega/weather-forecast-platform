import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
    disableCssColorScheme: true,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    allVariants: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: ".975rem",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: "text.primary",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          transition: "none",
          borderRadius: "100px",
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        backgroundPrimary: {
          main: "#f1f3fd",
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
});
