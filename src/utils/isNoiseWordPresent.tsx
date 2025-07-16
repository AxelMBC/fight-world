import type { mainEventType } from "../types/fightEventType";
const noiseWords = [
        "trending",
        "noticias",
        "vlog",
        "reaccion",
        "analisis",
        "entrevista",
        "podcast",
      ];

const isNoiseWordPresent = (data: { items: mainEventType[] }) => 
  (data.items || []).filter(
    (item: mainEventType) =>
      !noiseWords.some((word) =>
        item.snippet.title.toLowerCase().includes(word)
      )
  );

export default isNoiseWordPresent;
