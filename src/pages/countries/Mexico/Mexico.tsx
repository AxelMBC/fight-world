import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Styles
import "@styles/Mexico/style.scss";
import "@styles/all/spacing.scss";

// Data
import { topFightersData } from "./data/topFightersList";
import { topEventsList } from "./data/topEventsList";
import { mainEventFights } from "./data/mainEventsList";

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

const Mexico = () => {
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

  // Trigger saga to load fighters on component mount
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    dispatch(fetchFightersRequest());
  }, [dispatch]);

  // TODO: borrar console
  console.log("Estado redux: testing: ", reduxState);

  return (
    <div className="mexico-theme">
      <div
        className="container mx-auto p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
        style={{ maxWidth: "1120px" }}
      >
        <HeaderTitle title="Boxeo al Estilo Mexicano" />
        <MainEvent
          loading={loading}
          error={error}
          mainVideo={mainVideo}
          fetchMainVideo={fetchNextVideo}
        />

        <TopFighters
          title="Ídolos de México"
          topFightersData={topFightersData}
          onFighterSelect={fetchVideoByFighter}
        />

        <TopEvents
          title="Peleas Históricas"
          videos={topEventsList}
          onVideoSelect={selectSpecificVideo}
        />
      </div>
    </div>
  );
};

export default Mexico;
