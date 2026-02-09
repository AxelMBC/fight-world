import { createTheme } from "@mui/material/styles";
import { mexicoConfig } from "./mexico.config";

export const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
    h1: {
      fontFamily: mexicoConfig.titleFont,
    },
    h2: {
      fontFamily: mexicoConfig.titleFont,
    },
    h3: {
      fontFamily: mexicoConfig.titleFont,
    },
    button: {
      fontFamily: mexicoConfig.buttonFont,
    },
  },
  palette: {
    primary: {
      main: mexicoConfig.colorPalette.primary,
      dark: mexicoConfig.colorPalette.primaryDark,
    },
    secondary: {
      main: mexicoConfig.colorPalette.secondary,
    },
  },
});
