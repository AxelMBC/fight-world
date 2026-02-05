import { createTheme} from "@mui/material/styles";
import { mexicoConfig } from "./mexico.config";


export const theme = createTheme({
  typography: {
    fontFamily: "Raleway, Arial",
    h1: {
      fontFamily: "Anton, sans-serif",
    },
  },
  palette: {
    primary: {
      main: mexicoConfig.colorPalette.primaryDark,
    },
    secondary: {
      main: mexicoConfig.colorPalette.secondary,
    },
  },
});