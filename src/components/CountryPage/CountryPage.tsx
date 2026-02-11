import { useEffect } from "react";

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`country-theme ${config.themeClassName}`}
        sx={{
          pb: 8,
          backgroundColor: "background.default",
        }}
      >
        <Container
          disableGutters
          sx={{
            maxWidth: config.maxWidth,
            backgroundColor: "background.default",
            mx: "auto",
            p: {
              xs: 2,
              sm: 3,
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
