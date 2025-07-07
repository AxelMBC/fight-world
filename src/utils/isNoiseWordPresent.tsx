import type { MainEventType } from "../types/VideoContentType";
const noiseWords = [
        "trending",
        "noticias",
        "vlog",
        "reaccion",
        "analisis",
        "entrevista",
        "podcast",
      ];

const isNoiseWordPresent = (data: { items: MainEventType[] }) => 
  (data.items || []).filter(
    (item: MainEventType) =>
      !noiseWords.some((word) =>
        item.snippet.title.toLowerCase().includes(word)
      )
  );

export default isNoiseWordPresent;
