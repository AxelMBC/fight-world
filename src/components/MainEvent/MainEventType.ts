import type { mainEventType } from "@/types/fightEventType";

export interface MainEventProps {
  loading: boolean;
  error: string | null;
  mainVideo: mainEventType | null;
  fetchMainVideo: () => void;
}
