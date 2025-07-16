export interface MainEventVideoType {
  id: number;
  idYt: string;
  title: string;
  description: string;
  tags: string[] | [];
  startTime: string;
  fighterBlue?: string;
  fighterRed?: string;
}

export interface TopVideoType {
  id: number;
  idYt: string;
  title: string;
  tags: string[];
  thumbnail: string;
}
