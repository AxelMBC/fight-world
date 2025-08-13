import type { mainEventType } from "../../../types/fightEventType";
import type { fighterType } from "../../../types/fighterType";
import { useState, useEffect, useRef } from "react";

// Styles
import "../../../styles/Mexico/style.scss";

// Resources
import Flag from "./resources/Flag";

// Utils
import scrollToMainEvent from "../../../utils/scrollToMainEvent";
import shuffleArray from "../../../utils/shuffleArray";
import pickRandomEvent from "../../../utils/pickRandomEvent";

// Data
import { topFightersData } from "./data/topFighters";
import { topEvents } from "./data/topEvents";
import { mainEventFights } from "./data/mainEvents";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import TopFigths from "../../../components/TopEvents";

const Mexico = () => {
  const [mainVideo, setMainEvent] = useState<mainEventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainEventQueue = useRef<mainEventType[]>([]);

  const fetchMainVideo = async () => {
    setLoading(true);

    if (mainEventQueue.current.length === 0) {
      setError("No hay más videos disponibles.");
      setMainEvent(null);
      setLoading(false);
      return;
    }

    const { randomEvent, randomIndex } = pickRandomEvent(
      mainEventQueue.current
    );

    mainEventQueue.current.splice(randomIndex, 1);

    setMainEvent(randomEvent);
    scrollToMainEvent();
    setError(null);
    setLoading(false);
  };

  const fetchFighterMainEvent = (fighter: fighterType) => {
    const fighterEvents = mainEventQueue.current
      .map((event, index) => ({ event, index }))
      .filter(({ event }) => event.fighterId === fighter.id);

    if (fighterEvents.length > 0) {
      const randomIndexInFighterEvents = Math.floor(
        Math.random() * fighterEvents.length
      );
      const { event: randomEvent, index: originalIndex } =
        fighterEvents[randomIndexInFighterEvents];

      setMainEvent(randomEvent);
      scrollToMainEvent();
      setError(null);

      mainEventQueue.current.splice(originalIndex, 1);
    } else {
      setError("No main event found for the selected fighter.");
    }
  };

  useEffect(() => {
    mainEventQueue.current = shuffleArray(mainEventFights);
    fetchMainVideo();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-4 font-sans">
      <div
        className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
        style={{ maxWidth: "1405px" }}
      >
        <HeaderTitle flag={Flag} title="Boxeo al Estilo" style="MEXICANO" />
        <MainEvent
          loading={loading}
          error={error}
          mainVideo={mainVideo}
          fetchMainVideo={fetchMainVideo}
        />

        <TopFighters
          title="ÍDOLOS DE MÉXICO"
          topFightersData={topFightersData}
          onFighterSelect={fetchFighterMainEvent}
        />

        <TopFigths
          title="LAS PELEAS MAS LEGENDARIAS"
          videos={topEvents}
          setMainEvent={setMainEvent}
        />
      </div>
    </div>
  );
};

export default Mexico;
