export interface fighterType {
  id: string;
  name: string;
  record: string;
  achievements: string;
  image: string;
}

export interface topFightersType{
  topFightersData: fighterType[];
  setSelectedFighter: (fighter: fighterType | null) => void;
}