// Types
import type { MainEventType } from "../../../types/VideoContentType";

import React, { useState, useEffect, useCallback } from "react";

// Styles
import "../../../styles/Mexico/style.css";

// Data
import { topBoxers } from "./data/topBoxers";
import { videosBoxing } from "./data/videosBoxing";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import TopVideos from "../../../components/TopVideos";

// Utils
import isNoiseWordPresent from "../../../utils/isNoiseWordPresent";

const BoxeoBrutal: React.FC = () => {
  const [mainVideo, setMainVideo] = useState<MainEventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMainVideo = useCallback(async (retryCount = 0) => {
    if (retryCount > 3) {
      setError(
        "No se encontraron videos de combate disponibles. Intenta de nuevo."
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const boxer1 =
        topBoxers[Math.floor(Math.random() * topBoxers.length)].name;
      const keywords = [
        "full fight",
        "boxeo profesional",
        "pelea completa",
        "campeonato mundial",
        "full fight",
        "combate completo", 
        "título mundial",
        "pelea estelar",
        "combate estelar",
        "boxeo profesional",
        "sparring"

      ];
      const excludeTerms =
        "-reaccion -resumen -highlights -'mejores momentos' -historia -homenaje -debate -analisis -entrevista -documental -podcast -noticias -vlog -trending";

      const query = `"${boxer1}" (${keywords.join(" | ")}) ${excludeTerms}`;

      const key = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!key)
        throw new Error("La llave del API de YouTube no está configurada.");

      const categoryId = "17"; // Deportes
      const videoDuration = "long"; // > 20 minutos

      const maxResults = "25";

      const apiUrlURLSearchParams = new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        maxResults: maxResults,
        order: "viewCount",
        videoCategoryId: categoryId,
        videoDuration: videoDuration,
        videoDefinition: "high",
        regionCode: "MX",
        key: key,
      })

    
      const youTubeSearchApi = `https://www.googleapis.com/youtube/v3/search?${apiUrlURLSearchParams}`;

      const res = await fetch(youTubeSearchApi);
      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.error.message || `Error del servidor: ${res.statusText}`
        );
      const validVideos = isNoiseWordPresent(data)

      if (validVideos.length === 0) {
        console.warn(
          "Búsqueda no encontró videos, reintentando con otros parámetros..."
        );
        fetchMainVideo(retryCount + 1);
        return;
      }

      const newMainVideo =
        validVideos[Math.floor(Math.random() * validVideos.length)];

      setMainVideo(newMainVideo);
    } catch (e) {
      setError((e as Error).message);
      fetchMainVideo(retryCount + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMainVideo();
  }, [fetchMainVideo]);

  return (
    <>
      <div className="min-h-screen p-4 sm:p-4 font-sans">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black" style={{maxWidth: "1405px"}}>
          <HeaderTitle />
          <MainEvent
            loading={loading}
            error={error}
            mainVideo={mainVideo}
            fetchMainVideo={fetchMainVideo}
          />

          <TopFighters topFighters={topBoxers} />

          <TopVideos videos={videosBoxing} />
        </div>
      </div>
    </>
  );
};

export default BoxeoBrutal;
