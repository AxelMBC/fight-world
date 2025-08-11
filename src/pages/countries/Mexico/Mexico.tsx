import type { mainEventType } from "../../../types/fightEventType";
import type { fighterType } from "../../../types/fighterType";

import { useState, useCallback, useEffect, useRef } from "react";

// Styles
import "../../../styles/Mexico/style.scss";

// Resources
import Flag from "./resources/Flag";

// Utils
import scrollToMainEvent from "../../../utils/scrollToMainEvent";
import shuffleArray from "../../../utils/shuffleArray";

// Data
import { topFightersData } from "./data/topFighters";
import { topFights } from "./data/topFights";
import { mainEventFights } from "./data/mainEvents";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import TopFigths from "../../../components/TopFights";

const Mexico = () => {
  const [mainVideo, setMainEvent] = useState<mainEventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFighter, setSelectedFighter] = useState<fighterType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const mainEventQueue = useRef<mainEventType[]>([]);

  const fetchMainVideo = useCallback(async () => {
    setLoading(true);

    if (mainEventQueue.current.length === 0) {
      setError("No hay más videos disponibles.");
      setMainEvent(null);
      setLoading(false);
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * mainEventQueue.current.length
    );
    const randomEvent = mainEventQueue.current[randomIndex];

    mainEventQueue.current.splice(randomIndex, 1);

    setMainEvent(randomEvent);
    scrollToMainEvent();
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    mainEventQueue.current = shuffleArray(mainEventFights);
  }, []);

  useEffect(() => {
    const fetchFighterMainEvent = () => {
      const fightEvent = mainEventQueue.current.find(
        (event) => event.fighterId === selectedFighter?.id
      );

      if (fightEvent) {
        scrollToMainEvent();
        setMainEvent(fightEvent);

        mainEventQueue.current = mainEventQueue.current.filter(
          (event) => event.fighterId !== selectedFighter?.id
        );

        setError(null);
      } else {
        setError("No main event found for the selected fighter.");
      }
    };

    if (selectedFighter) {
      fetchFighterMainEvent();
    } else {
      fetchMainVideo();
    }
  }, [fetchMainVideo, selectedFighter]);

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
          setSelectedFighter={setSelectedFighter}
        />

        <TopFigths
          title="LAS PELEAS MAS LEGENDARIAS"
          videos={topFights}
          setMainEvent={setMainEvent}
        />
      </div>
    </div>
  );
};

export default Mexico;
