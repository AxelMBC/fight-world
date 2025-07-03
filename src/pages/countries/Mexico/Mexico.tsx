import React, { useState, useEffect, useCallback } from "react";

import "../../../styles/Mexico/style.css";

// Types
import type { YouTubeVideo } from "../../../types/YoutubeVideo";

// Data
import { topBoxers } from "./data/topFighters";
import { boxingVideos } from "./data/boxingVideos";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import "../../../components/MainEvent";
import TopVideos from "../../../components/TopVideos";

const BoxeoBrutal: React.FC = () => {
  const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
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
      ];
      const excludeTerms =
        "-reaccion -analisis -entrevista -documental -podcast -noticias -vlog -trending";
      const query = `"${boxer1}" (${keywords.join(" | ")}) ${excludeTerms}`;

      const key = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!key)
        throw new Error("La llave del API de YouTube no está configurada.");

      const categoryId = "17"; // Deportes
      const videoDuration = "long"; // > 20 minutos

      const maxResults = 25;

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=${maxResults}&order=viewCount&videoCategoryId=${categoryId}&videoDuration=${videoDuration}&videoDefinition=high&regionCode=MX&key=${key}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.error.message || `Error del servidor: ${res.statusText}`
        );

      const noiseWords = [
        "trending",
        "noticias",
        "vlog",
        "reaccion",
        "analisis",
        "entrevista",
        "podcast",
      ];
      const validVideos = (data.items || []).filter(
        (item: YouTubeVideo) =>
          !noiseWords.some((word) =>
            item.snippet.title.toLowerCase().includes(word)
          )
      );

      if (validVideos.length === 0) {
        console.warn(
          "Búsqueda no encontró videos, reintentando con otros parámetros..."
        );
        fetchMainVideo(retryCount + 1);
        return;
      }

      // Elegimos un video aleatorio de los resultados válidos.
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
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black">
          <HeaderTitle />
          <MainEvent
            loading={loading}
            error={error}
            mainVideo={mainVideo}
            fetchMainVideo={fetchMainVideo}
          />

          <TopFighters />

          {boxingVideos.length > 0 && <TopVideos videos={boxingVideos} />}
        </div>
      </div>
    </>
  );
};

export default BoxeoBrutal;
