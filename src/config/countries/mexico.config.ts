import type { CountryPageConfig } from "@/components/CountryPage/CountryPage.types";

export const mexicoConfig: CountryPageConfig = {
  countryName: "Mexico",
  themeClassName: "mexico-theme",
  headerTitle: "Boxeo al Estilo Mexicano",
  topFightersTitle: "Ídolos de México",
  topEventsTitle: "Peleas Históricas",
  colorPalette: {
    primary: "#ca2626",
    primaryDark: "#780606",
    primaryLight: "#8a3d3d",
    secondary: "#26c954",
    secondaryDark: "#3d744d",
    background: "#031602",
    text: "#faf9f6",
    accent: "#faf9f6",
    error: "#d40000",
  },
  maxWidth: "1120px",
  fontFamily: '"Roboto Slab", sans-serif',
  enableScrollToTop: true,
  enableReduxFighters: true,
};
