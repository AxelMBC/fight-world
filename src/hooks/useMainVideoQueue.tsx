import { useState, useEffect, useRef } from "react";
import type { mainEventType } from "../types/fightEventType";
import type { fighterType } from "../types/fighterType";
import shuffleArray from "../utils/shuffleArray";
import pickRandomEvent from "../utils/pickRandomEvent";
import scrollToMainEvent from "../utils/scrollToMainEvent";

export const useMainVideoQueue = (initialEvents: mainEventType[]) => {
  const [mainVideo, setMainEvent] = useState<mainEventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mainEventQueue = useRef<mainEventType[]>([]);

  useEffect(() => {
    if (initialEvents.length > 0) {
      mainEventQueue.current = shuffleArray([...initialEvents]);
      fetchNextVideo();
    }
  }, [initialEvents]);

  const selectSpecificVideo = (video: mainEventType): void => {
    setMainEvent(video);
    setError(null);
    scrollToMainEvent();
  };

  const fetchNextVideo = (): void => {
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

  const fetchVideoByFighter = (fighter: fighterType): void => {
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
      setMainEvent(null);
    }
  };

  return {
    mainVideo,
    loading,
    error,
    fetchNextVideo,
    fetchVideoByFighter,
    selectSpecificVideo,
  };
};
