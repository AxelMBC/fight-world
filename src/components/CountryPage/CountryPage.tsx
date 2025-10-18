import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";

// Styles
import "./CountryPage.scss";
import "@styles/all/spacing.scss";

// Components
import HeaderTitle from "@components/HeaderTitle";
import TopFighters from "@components/TopFighters";
import MainEvent from "@components/MainEvent";
import TopEvents from "@components/TopEvents";

// Hooks
import { useMainVideoQueue } from "@/hooks/useMainVideoQueue";

// Redux
import { selectFightersState } from "@store/Fighters";
import { fetchFightersRequest } from "@store/Fighters";

// Types
import type { CountryPageProps } from "./CountryPage.types";

const CountryPage = ({
  config,
  topFightersData,
  topEventsList,
  mainEventFights,
}: CountryPageProps) => {
  const dispatch = useDispatch();
  const {
    mainVideo,
    loading,
    error,
    fetchNextVideo,
    fetchVideoByFighter,
    selectSpecificVideo,
  } = useMainVideoQueue(mainEventFights);

  const reduxState = useSelector(selectFightersState);

  // Scroll to top on component mount
  useEffect(() => {
    if (config.enableScrollToTop) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trigger saga to load fighters on component mount
  useEffect(() => {
    if (config.enableReduxFighters) {
      dispatch(fetchFightersRequest());
    }
  }, [dispatch, config.enableReduxFighters]);

  // TODO: borrar console
  useEffect(() => {
    if (config.enableReduxFighters) {
      console.log("Estado redux: testing: ", reduxState);
    }
  }, [config.enableReduxFighters, reduxState]);

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
