import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    backgroundPrimary: {
      main: string;
    };
  }

  interface PaletteOptions {
    backgroundPrimary?: {
      main: string;
    };
  }
}
