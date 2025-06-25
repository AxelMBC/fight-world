import React, { useState, useEffect, useCallback } from 'react';

import '../../../styles/Mexico/style.css';

// Types
import type { Fighter } from '../../../types/Fighter';
import type { YouTubeVideo } from '../../../types/YoutubeVideo';

// Components
import VideoCard from './VideoCard';
import BoxerCard from './BoxerCard';
import MainEventVideo from './MainEventVideo';

// Esta lista de peleadores es la base para nuestras búsquedas de alta calidad.
const topBoxers: Fighter[] = [
  { id: "1", name: "Julio César Chávez", record: "107-6-2", achievements: "El Gran Campeón Mexicano", image: "https://i.ytimg.com/vi/KAi-7KO9COw/maxresdefault.jpg" },
  { id: "2", name: "Canelo Álvarez", record: "61-2-2", achievements: "Rey Indiscutido", image: "https://e9t9dc498r8.exactdn.com/wp-content/uploads/2024/12/Canelo-Alvarez-peleas-2025.jpg?strip=all&lossy=1&ssl=1" },
  { id: "3", name: "Ricardo López", record: "51-0-1", achievements: "Finito, La Perfección", image: "https://www.infobae.com/resizer/v2/6AMVEHZNYVGHJGXDUVFYHCJNRQ.jpg?auth=673c35eeb291c91cd8d7928c4a4943f64ffe929c7200e7715ec93f8e4afd8155" },
  { id: "4", name: "Juan Manuel Márquez", record: "56-7-1", achievements: "Maestro del Contragolpe", image: "https://i0.wp.com/wbanews.com/wp-content/uploads/2013/01/Juan-Manuel-Marquez-dejo-a-Latinoamerica-en-lo-mas-alto.jpg" },
  { id: "5", name: "Salvador Sánchez", record: "44-1-1", achievements: "El Campeón Inmortal", image: "https://www.debate.com.mx/img/2020/06/13/salvador_sanchez-2.jpg?__scale=c:transparent,w:640,h:860,t:3" }
];

const BoxeoBrutal: React.FC = () => {
  const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndSetVideo = useCallback(async (retryCount = 0) => {
    // Evita bucles infinitos en caso de un error persistente de la API.
    if (retryCount > 5) {
      setError("No se pudo contactar con la API de YouTube. Intenta más tarde.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- PRIORIDAD 1 Y 2: ASEGURAR COMBATE DE ALTA CALIDAD ---
      const boxer1 = topBoxers[Math.floor(Math.random() * topBoxers.length)].name;
      const keywords = ["full fight", "boxeo profesional", "pelea completa", "campeonato mundial"];
      const excludeTerms = "-reaccion -analisis -entrevista -documental -podcast -noticias -vlog -trending";
      const query = `"${boxer1}" (${keywords.join(' | ')}) ${excludeTerms}`;
      
      const key = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!key) throw new Error("La llave del API de YouTube no está configurada.");

      const categoryId = '17'; // 'Deportes'
      const videoDuration = 'long'; // > 20 minutos

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=50&order=viewCount&videoCategoryId=${categoryId}&videoDuration=${videoDuration}&videoDefinition=high&regionCode=MX&key=${key}`;
      
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error.message || `Error del servidor: ${res.statusText}`);

      const shuffledItems = data.items?.sort(() => 0.5 - Math.random()) || [];

      // Filtro final por título para máxima seguridad
      const noiseWords = ["trending", "noticias", "vlog", "reaccion", "analisis", "entrevista", "podcast"];
      const validVideos = shuffledItems.filter(item => 
          !noiseWords.some(word => item.snippet.title.toLowerCase().includes(word))
      );
      
      // --- PRIORIDAD 4: CONTENIDO INFINITO ---
      // Si la búsqueda estricta no arrojó NADA, se vuelve a intentar con parámetros un poco menos estrictos.
      if (validVideos.length === 0) {
        console.warn("La búsqueda estricta no encontró videos, reintentando...");
        fetchAndSetVideo(retryCount + 1); // Llamada recursiva para asegurar que siempre haya un video.
        return;
      }

      // --- PRIORIDAD 3: ALEATORIEDAD ---
      // El primer video de la lista aleatoria es el principal.
      const newMainVideo = validVideos[0];
      // Los siguientes son para la galería secundaria.
      const newGalleryVideos = validVideos.slice(1, 7);

      setMainVideo(newMainVideo);
      setVideos(newGalleryVideos);

    } catch (e) {
      setError((e as Error).message);
      // Si hay un error, intentar de nuevo.
      fetchAndSetVideo(retryCount + 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetVideo();
  }, [fetchAndSetVideo]);

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 font-sans">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black">
          <header className="text-center mb-12 pt-8">
             <div className="flex justify-center items-center space-x-4 mb-8">
                 <span className="w-16 h-8 bg-[#006847]"></span>
                 <span className="w-16 h-8 bg-white border-2 border-black"></span>
                 <span className="w-16 h-8 bg-[#CE1126]"></span>
              </div>
             <h1 className="text-6xl md:text-9xl font-anton uppercase text-stroke">
               Boxeo al Estilo Mexicano
             </h1>
             <p className="text-2xl md:text-3xl font-anton mt-2">
                 <span className="text-stroke-red">EL ESTILO MEXICANO</span>
             </p>
          </header>

          <section className="mb-20 border-y-8 border-black py-10">
            {loading && <p className="text-center font-bold text-3xl animate-pulse">BUSCANDO COMBATE...</p>}
            {error && <p className="text-center font-bold text-2xl text-red-600 bg-black p-4">{error}</p>}
            {mainVideo && <MainEventVideo video={mainVideo} />}
            {!loading && mainVideo && (
                <div className="text-center mt-8">
                    <button 
                        onClick={() => fetchAndSetVideo()} 
                        className="bg-red-600 text-white font-anton uppercase text-2xl py-3 px-8 border-4 border-black hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0_#000]"
                    >
                        Buscar Otro Combate
                    </button>
                </div>
            )}
          </section>

          <section className="mb-20">
            <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">ÍDOLOS DE MÉXICO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {topBoxers[0] && <BoxerCard boxer={topBoxers[0]} rank={1} />}
              </div>
              <div className="md:col-span-1">
                {topBoxers[1] && <BoxerCard boxer={topBoxers[1]} rank={2} />}
              </div>
              {topBoxers.slice(2).map((b, i) => <BoxerCard key={b.id} boxer={b} rank={i + 3} />)}
            </div>
          </section>

          {videos.length > 0 && (
            <section>
              <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">MÁS PELEAS LEGENDARIAS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(v => v.id && v.id.videoId && <VideoCard key={v.id.videoId} video={v} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BoxeoBrutal;