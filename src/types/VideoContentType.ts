export interface MainEventType {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
  };
}

export interface TopVideoType {
  id: number;
  title: string;
  tags: string[];
  thumbnail: string;
  idYt: string;
}
