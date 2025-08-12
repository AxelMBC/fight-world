import type { mainEventType } from "../types/fightEventType";

const pickRandomEvent = (eventList: mainEventType[]) => {
  const randomIndex = Math.floor(Math.random() * eventList.length);
  const randomEvent = eventList[randomIndex];

  return { randomEvent, randomIndex };
};

export default pickRandomEvent;
