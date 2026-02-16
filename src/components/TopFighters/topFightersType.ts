import type { fighterType } from "@/types/fighterType";

export interface topFightersType {
  title: string;
  topFightersData: fighterType[];
  onFighterSelect: (fighter: fighterType) => void;
}
