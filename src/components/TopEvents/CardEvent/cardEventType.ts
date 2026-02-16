import type { mainEventType } from "@/types/fightEventType";

export interface cardEventType {
  video: mainEventType;
  onVideoSelect: (event: mainEventType) => void;
}
