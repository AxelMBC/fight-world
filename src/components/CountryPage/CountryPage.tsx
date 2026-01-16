import { useEffect } from "react";
import type { CSSProperties } from "react";

// Styles
import "./CountryPage.scss";
import "@styles/all/spacing.scss";

// Components
import HeaderTitle from "@/components/HeaderTitle";
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

  // Generate CSS custom properties from color palette
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
    <div className={`country-theme ${config.themeClassName} p-4 sm:p-6`} style={themeStyles}>
      <div
        className="container mx-auto p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
        style={{ maxWidth: config.maxWidth }}
      >
        <HeaderTitle title={config.headerTitle} />
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
      </div>
    </div>
  );
};

export default CountryPage;
