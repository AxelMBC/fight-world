import { useEffect } from "react";
import type { CSSProperties } from "react";

// MUI
import { Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Styles
import "./CountryPage.scss";

// Components
import TitleCountry from "@/components/TitleCountry";
import TopFighters from "@/components/TopFighters";
import MainEvent from "@/components/MainEvent";
import TopEvents from "@/components/TopEvents";

// Hooks
import { useMainVideoQueue } from "@/hooks/useMainVideoQueue";

// Types
import type { CountryPageProps } from "./CountryPage.types";

const CountryPage = ({
  config,
  topFightersData,
  topEventsList,
  mainEventFights,
  theme,
}: CountryPageProps) => {
  const {
    mainVideo,
    loading,
    error,
    fetchNextVideo,
    fetchVideoByFighter,
    selectSpecificVideo,
  } = useMainVideoQueue(mainEventFights);

  useEffect(() => {
    if (config.enableScrollToTop) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CSS custom properties (theme bridge)
  const themeStyles: CSSProperties = {
    "--color-primary": config.colorPalette.primary,
    "--color-primary-dark": config.colorPalette.primaryDark,
    "--color-primary-light": config.colorPalette.primaryLight,
    "--color-secondary": config.colorPalette.secondary,
    "--color-secondary-dark": config.colorPalette.secondaryDark,
    "--color-background": config.colorPalette.background,
    "--color-text": config.colorPalette.text,
    "--color-accent": config.colorPalette.accent,
    "--color-error": config.colorPalette.error,
  } as CSSProperties;

  if (config.fontFamily) {
    (themeStyles as any)["--font-family"] = config.fontFamily;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`country-theme ${config.themeClassName}`}
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
        }}
        style={themeStyles}
      >
        <Container
          disableGutters
          sx={{
            maxWidth: config.maxWidth,
            mx: "auto",
            p: {
              xs: 2,
              sm: 3,
            },
            bgcolor: "#fff",
            border: {
              xs: "4px solid #000",
              md: "8px solid #000",
            },
          }}
        >
          <TitleCountry title={config.headerTitle} />

          <MainEvent
            loading={loading}
            error={error}
            mainVideo={mainVideo}
            fetchMainVideo={fetchNextVideo}
          />

          <TopFighters
            title={config.topFightersTitle}
            topFightersData={topFightersData}
            onFighterSelect={fetchVideoByFighter}
          />

          <TopEvents
            title={config.topEventsTitle}
            videos={topEventsList}
            onVideoSelect={selectSpecificVideo}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CountryPage;
