// Styles
import "../../../styles/Thailand/style.scss";
import "../../../styles/all/spacing.scss";

// Data
import { topFightersData } from "./data/topFightersList";
import { topEvents } from "./data/topEventsList";
import { mainEventFights } from "./data/mainEventsList";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import TopFigths from "../../../components/TopEvents";

// Hooks
import { useMainVideoQueue } from "../../../hooks/useMainVideoQueue";

const Thailand = () => {
  const {
    mainVideo,
    loading,
    error,
    fetchNextVideo,
    fetchVideoByFighter,
    selectSpecificVideo,
  } = useMainVideoQueue(mainEventFights);

  return (
    <div className="thailand-theme min-h-screen p-4 sm:p-4 font-sans">
      <div
        className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
        style={{ maxWidth: "1405px" }}
      >
        <HeaderTitle title="El arte de las 8 extremidades" />
        <MainEvent
          loading={loading}
          error={error}
          mainVideo={mainVideo}
          fetchMainVideo={fetchNextVideo}
        />

        <TopFighters
          title="Leyendas historicas del Box Tailandes"
          topFightersData={topFightersData}
          onFighterSelect={fetchVideoByFighter}
        />

        <TopFigths
          title="Las guerras mas emocionantes"
          videos={topEvents}
          onVideoSelect={selectSpecificVideo}
        />
      </div>
    </div>
  );
};

export default Thailand;
