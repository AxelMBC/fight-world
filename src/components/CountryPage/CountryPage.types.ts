export interface ColorPalette {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  background: string;
  white?: string;
  text: string;
  accent: string;
  error: string;
}

export interface CountryPageConfig {
  countryName: string;
  themeClassName: string;
  headerTitle: string;
  topFightersTitle: string;
  topEventsTitle: string;
  colorPalette: ColorPalette;
  maxWidth: string;
  bodyFont?: string;
  enableScrollToTop?: boolean;
  enableReduxFighters?: boolean;
  titleFont?: string;
  buttonFont?: string;
}

export interface CountryPageProps {
  config: CountryPageConfig;
  topFightersData: any[];
  topEventsList: any[];
  mainEventFights: any[];
  theme?: any;
}
