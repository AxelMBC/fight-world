export interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
  };
}

export interface VideoArchive {
  title: string;
  tags: string[];
  thumbnail: string;
  idYt: string;
}
