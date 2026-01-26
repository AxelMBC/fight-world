export interface fighterType {
  id: string;
  name: string;
  record: string;
  nickName: string;
  image?: string;
}

export interface topFightersType {
  title: string;
  topFightersData: fighterType[];
  setSelectedFighter: (fighter: fighterType | null) => void;
}
