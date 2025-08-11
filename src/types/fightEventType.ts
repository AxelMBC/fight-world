export interface mainEventType {
  id: number;
  idYt: string;
  title: string;
  description: string;
  tags: string[] | [];
  startTime: string;
  fighterId?: string;
  fighterBlue?: string;
  fighterRed?: string;
  thumbnail?: string;
}

export interface topFightsType {
  id: number;
  idYt: string;
  title: string;
  tags: string[];
  thumbnail?: string;
}
