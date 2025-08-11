export interface fighterType {
  id: string;
  name: string;
  record: string;
  achievements: string;
  image: string;
}

export interface topFightersType{
  title: string;
  topFightersData: fighterType[];
  setSelectedFighter: (fighter: fighterType | null) => void;
}