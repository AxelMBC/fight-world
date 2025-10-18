import type { CountryPageConfig } from "@components/CountryPage/CountryPage.types";

export const thailandConfig: CountryPageConfig = {
  countryName: "Thailand",
  themeClassName: "thailand-theme",
  headerTitle: "Armas Thailandesas",
  topFightersTitle: "Leyendas Historicas",
  topEventsTitle: "Las guerras de Thailandia",
  colorPalette: {
    primary: "#0047AB",      // Royal blue
    primaryDark: "#002855",
    primaryLight: "#4D7FBF",
    secondary: "#FFD700",    // Gold
    secondaryDark: "#B8860B",
    background: "#001f3f",   // Navy background
    text: "#faf9f6",
    accent: "#faf9f6",
    error: "#d40000",
  },
  maxWidth: "1120px",
  fontFamily: '"Roboto Slab", sans-serif',
  enableScrollToTop: false,
  enableReduxFighters: false,
};
