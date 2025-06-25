import React, { useState, useEffect, useCallback } from "react";

import "../../../styles/Mexico/style.css";

// Types
import type { YouTubeVideo } from "../../../types/YoutubeVideo";

// Data
import { topBoxers } from "./data/topFighters";
import { dummyVideos } from "./data/dummyVideos";

// Components
import VideoCard from "./VideoCard";
import BoxerCard from "./BoxerCard";
import MainEventVideo from "./MainEventVideo";

const BoxeoBrutal: React.FC = () => {
  
  const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMainVideo = useCallback(async (retryCount = 0) => {
    if (retryCount > 3) {
      setError("No se encontraron videos de combate disponibles. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const boxer1 = topBoxers[Math.floor(Math.random() * topBoxers.length)].name;
      const keywords = ["full fight", "boxeo profesional", "pelea completa", "campeonato mundial"];
      const excludeTerms = "-reaccion -analisis -entrevista -documental -podcast -noticias -vlog -trending";
      const query = `"${boxer1}" (${keywords.join(" | ")}) ${excludeTerms}`;
      
      const key = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!key) throw new Error("La llave del API de YouTube no está configurada.");

      const categoryId = "17"; // Deportes
      const videoDuration = "long"; // > 20 minutos

      const maxResults = 25; 

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=${maxResults}&order=viewCount&videoCategoryId=${categoryId}&videoDuration=${videoDuration}&videoDefinition=high&regionCode=MX&key=${key}`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error.message || `Error del servidor: ${res.statusText}`);
      
      const noiseWords = ["trending", "noticias", "vlog", "reaccion", "analisis", "entrevista", "podcast"];
      const validVideos = (data.items || []).filter((item: YouTubeVideo) =>
        !noiseWords.some((word) => item.snippet.title.toLowerCase().includes(word))
      );

      if (validVideos.length === 0) {
        console.warn("Búsqueda no encontró videos, reintentando con otros parámetros...");
        fetchMainVideo(retryCount + 1);
        return;
      }
      
      // Elegimos un video aleatorio de los resultados válidos.
      const newMainVideo = validVideos[Math.floor(Math.random() * validVideos.length)];
      
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
          <header className="text-center mb-6">
            <div className="flex justify-center items-center space-x-4 mt-1 mb-4">
              <span className="w-16 h-8 bg-[#006847]"></span>
              <span className="w-16 h-8 bg-white border-2 border-black"></span>
              <span className="w-16 h-8 bg-[#CE1126]"></span>
            </div>
            <h1 className="pt-2 text-6xl md:text-8xl font-anton uppercase text-stroke">
              Boxeo al Estilo <span className="text-stroke-red">MEXICANO</span>
            </h1>
          </header>

          <section className="mb-20 border-y-8 border-black py-5">
            {loading && (
              <p className="text-center font-bold text-3xl animate-pulse">
                BUSCANDO COMBATE...
              </p>
            )}
            {error && (
              <p className="text-center font-bold text-2xl text-red-600 bg-black p-4">
                {error}
              </p>
            )}
            {mainVideo && <MainEventVideo video={mainVideo} />}
            {!loading && mainVideo && (
              <div className="text-center my-7">
                <button
                  onClick={() => fetchMainVideo()}
                  className="cursor-pointer bg-red-600 text-white font-anton uppercase text-2xl py-3 px-8 border-4 border-black hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0_#000]"
                >
                  Buscar Otro Combate
                </button>
              </div>
            )}
          </section>

          <section className="mb-20">
            <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
              ÍDOLOS DE MÉXICO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {topBoxers[0] && <BoxerCard boxer={topBoxers[0]} rank={1} />}
              </div>
              <div className="md:col-span-1">
                {topBoxers[1] && <BoxerCard boxer={topBoxers[1]} rank={2} />}
              </div>
              {topBoxers.slice(2).map((b, i) => (
                <BoxerCard key={b.id} boxer={b} rank={i + 3} />
              ))}
            </div>
          </section>

          {dummyVideos.length > 0 && (
            <section>
              <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
                MÁS PELEAS LEGENDARIAS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyVideos.map(
                  (v) =>
                    v.id &&
                    v.id.videoId && <VideoCard key={v.id.videoId} video={v} />
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BoxeoBrutal;