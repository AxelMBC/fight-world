import type { fighterType } from "@/types/fighterType";

export interface fighterCardType {
  boxer: fighterType;
  rank: number;
  onSelect: (fighter: fighterType) => void;
}
