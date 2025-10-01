// Styles
import "../../../styles/Mexico/style.scss";
import "../../../styles/all/spacing.scss";

// Data
import { topFightersData } from "./data/topFightersList";
import { topEvents } from "./data/topEventsList";
import { mainEventFights } from "./data/mainEventsList";

import HeaderTitle from "@components/HeaderTitle";
import TopFighters from "@components/TopFighters";
import MainEvent from "@components/MainEvent";
import TopFigths from "@components/TopEvents";

// Hooks
import { useMainVideoQueue } from "../../../hooks/useMainVideoQueue";
import { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectFightersState } from "../../../store/Fighters";
import { fetchFightersRequest } from "../../../store/Fighters";
import type { AppDispatch } from "../../../store";

const Mexico = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(fetchFightersRequest());
  }, [dispatch]);

  // TODO: borrar console
  console.log("Estado redux: ", reduxState);

  return (
    <div className="mexico-theme font-sans">
      <div
        className="container mx-auto p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
        style={{ maxWidth: "1040px" }}
      >
        <HeaderTitle title="Boxeo al Estilo Mexicano" />
        <MainEvent
          loading={loading}
          error={error}
          mainVideo={mainVideo}
          fetchMainVideo={fetchNextVideo}
        />

        <TopFighters
          title="DISFRUTA LAS PELEAS DE LOS ÍDOLOS DE MÉXICO"
          topFightersData={topFightersData}
          onFighterSelect={fetchVideoByFighter}
        />

        <TopFigths
          title="LAS PELEAS MAS LEGENDARIAS"
          videos={topEvents}
          onVideoSelect={selectSpecificVideo}
        />
      </div>
    </div>
  );
};

export default Mexico;
