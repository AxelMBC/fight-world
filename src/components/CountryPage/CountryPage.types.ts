export interface ColorPalette {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  background: string;
  white?: string;
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
