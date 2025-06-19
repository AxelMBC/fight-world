import React, { useState, useEffect } from 'react';

// --- TYPE DEFINITIONS (The Blueprint) ---
interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { high: { url: string } };
  };
}

interface Boxer {
  id: string;
  name: string;
  record: string;
  achievements: string;
  image: string;
}

// --- MOCK DATA (The Legends) ---
const topBoxers: Boxer[] = [
  { id: "1", name: "Julio César Chávez", record: "107-6-2", achievements: "El Gran Campeón Mexicano", image: "https://dmxg5wxfqgb4u.cloudfront.net/styles/inline/s3/2020-04/Chavez_Julio_Cesar_04-03-20.jpg" },
  { id: "2", name: "Salvador Sánchez", record: "44-1-1", achievements: "El Campeón Inmortal", image: "https://www.ringtv.com/wp-content/uploads/2021/08/salvador-sanchez-action-gettyimages-51787160-1024x733.jpg" },
  { id: "3", name: "Juan Manuel Márquez", record: "56-7-1", achievements: "Maestro del Contragolpe", image: "https://e0.365dm.com/12/12/2048x1152/Juan-Manuel-Marquez-Manny-Pacquiao-knockout_2874135.jpg" },
  { id: "4", name: "Canelo Álvarez", record: "61-2-2", achievements: "Rey Indiscutido", image: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/10/01/16961234714427.jpg" },
  { id: "5", name: "Ricardo López", record: "51-0-1", achievements: "Finito, La Perfección", image: "https://www.izquierdazo.com/wp-content/uploads/2022/10/finito-lopez-pelea.jpg" }
];

// --- CUSTOM CSS (The Finishing Blow) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
    
    body {
      background-color: #E5E5E5; /* Light grey, like raw concrete */
    }

    .font-anton {
      font-family: 'Anton', sans-serif;
    }

    .text-stroke {
      -webkit-text-stroke: 2px black;
      text-stroke: 2px black;
      color: white;
    }
    
    .text-stroke-red {
      -webkit-text-stroke: 2px #DC2626; /* red-600 */
      text-stroke: 2px #DC2626;
      color: transparent;
    }

    .card-tape::before {
      content: '';
      position: absolute;
      top: -15px;
      right: -15px;
      width: 80px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.4);
      border: 2px solid rgba(0,0,0,0.2);
      transform: rotate(45deg);
      z-index: 1;
    }
  `}</style>
);

// --- MAIN VIDEO PLAYER (The Main Event) ---
const MainVideoPlayer: React.FC<{ video: YouTubeVideo }> = ({ video }) => (
  <div className="bg-white p-4 border-4 border-black shadow-[10px_10px_0_#000]">
    <div className="border-4 border-black">
      <iframe
        src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1&start=300`}
        title={video.snippet.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ height: '500px', width: '100%' }}
      ></iframe>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl md:text-4xl font-anton uppercase">{video.snippet.title}</h3>
      <p className="mt-2 text-gray-700">{video.snippet.description}</p>
    </div>
  </div>
);


// --- VIDEO CARD COMPONENT (The Highlight Reel) ---
const VideoCard: React.FC<{ video: YouTubeVideo }> = ({ video }) => (
  <a
    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white flex flex-col border-4 border-black shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#DC2626] transition-all duration-200"
  >
    <div className="overflow-hidden border-b-4 border-black">
      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
    </div>
    <div className="p-4 flex-grow flex flex-col">
      <h3 className="font-bold text-lg uppercase flex-grow">{video.snippet.title}</h3>
      <div className="mt-4 text-red-600 font-bold self-end uppercase">Ver Video →</div>
    </div>
  </a>
);

// --- BOXER CARD COMPONENT (The Tale of the Tape) ---
const BoxerCard: React.FC<{ boxer: Boxer; rank: number }> = ({ boxer, rank }) => (
  <div className="relative group card-tape">
     <div className="relative bg-white border-4 border-black shadow-[10px_10px_0_#000] group-hover:shadow-[12px_12px_0_#16A34A] transition-all duration-200">
      <div className="absolute top-0 left-0 bg-black text-white font-anton text-5xl px-3 z-10">#{rank}</div>
      <div className="overflow-hidden">
          <img src={boxer.image} alt={boxer.name} className="w-full h-80 object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300" />
      </div>
      <div className="p-5 border-t-4 border-black">
        <h3 className="font-anton text-3xl uppercase text-black truncate">{boxer.name}</h3>
        <p className="mt-1 text-md text-gray-700 font-mono">RÉCORD: {boxer.record}</p>
        <p className="mt-2 text-green-700 font-bold uppercase">{boxer.achievements}</p>
      </div>
    </div>
  </div>
);


// --- MAIN COMPONENT (The Arena) ---
const BoxeoBrutal: React.FC = () => {
  const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // The environment variable name is NOT changed, as requested.
        const key = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!key) throw new Error("La llave del API de YouTube no está configurada.");
        
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=boxeo+mexicano+sparring+pelea+profesional&type=video&maxResults=7&key=${key}`
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error.message || `Error del servidor: ${res.statusText}`);
        }
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
            setMainVideo(data.items[0]); // First video is the main event
            setVideos(data.items.slice(1)); // The rest are for the gallery
        } else {
            throw new Error("No se encontraron videos.");
        }

      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen p-4 sm:p-8 font-sans">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black">
          {/* Header */}
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

          {/* Main Video Section */}
          <section className="mb-20 border-y-8 border-black py-10">
            {loading && <p className="text-center font-bold text-3xl animate-pulse">CARGANDO EL PRIMER ROUND...</p>}
            {error && <p className="text-center font-bold text-2xl text-red-600 bg-black p-4">ERROR: {error}</p>}
            {mainVideo && <MainVideoPlayer video={mainVideo} />}
          </section>

          {/* Top Boxers Section */}
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

          {/* More Videos Section */}
          {videos.length > 0 && (
            <section>
              <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">PELEAS LEGENDARIAS</h2>
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