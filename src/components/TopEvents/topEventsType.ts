import type { mainEventType } from "@/types/fightEventType";

export interface topEventsType {
  title: string;
  videos: mainEventType[];
  onVideoSelect: (event: mainEventType) => void;
}
