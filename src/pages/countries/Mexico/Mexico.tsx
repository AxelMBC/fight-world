import React, { useState, useEffect } from "react";

// Interfaces
interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

interface Boxer {
  id: string;
  name: string;
  record: string;
  achievements: string;
  image: string;
}

// Mock data
const topBoxers: Boxer[] = [
  { id: "1", name: "Julio César Chávez", record: "107-6-2", achievements: "6-time world champion in 3 weight classes", image: "https://via.placeholder.com/300x400?text=Julio+César+Chávez" },
  { id: "2", name: "Rubén Olivares", record: "89-13-3", achievements: "4-time world champion in bantam & featherweight", image: "https://via.placeholder.com/300x400?text=Rubén+Olivares" },
  { id: "3", name: "Salvador Sánchez", record: "44-1-1", achievements: "WBC Featherweight & lineal champion", image: "https://via.placeholder.com/300x400?text=Salvador+Sánchez" },
  { id: "4", name: "Juan Manuel Márquez", record: "56-7-1", achievements: "4-time world champion in 4 weight classes", image: "https://via.placeholder.com/300x400?text=Juan+Manuel+Márquez" },
  { id: "5", name: "Canelo Álvarez", record: "61-2-2", achievements: "Multiple-time world champion in 4 weight classes", image: "https://via.placeholder.com/300x400?text=Canelo+Álvarez" }
];

// VideoCard component
const VideoCard: React.FC<{ video: YouTubeVideo }> = ({ video }) => (
  <a
    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative border-4 border-black shadow-[6px_6px_0_0] hover:shadow-[12px_12px_0_0] hover:border-red-600 transition-all duration-200"
  >
    <div className="overflow-hidden">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="p-3 bg-white flex items-center">
      <span className="text-red-600 mr-2">▶</span>
      <h3 className="font-bold text-xl truncate text-black">{video.snippet.title}</h3>
    </div>
    <p className="text-sm text-gray-700 line-clamp-2 mt-1 px-3 pb-3">{video.snippet.description}</p>
  </a>
);

// BoxerCard component
const BoxerCard: React.FC<{ boxer: Boxer; rank: number }> = ({ boxer, rank }) => (
  <div className="relative border-[6px] border-double border-black shadow-[8px_8px_0_0] hover:shadow-[12px_12px_0_0] transition-all duration-200">
    <div className="absolute -top-4 -left-4 bg-red-600 text-white font-black px-3 py-1 text-2xl">#{rank}</div>
    <img src={boxer.image} alt={boxer.name} className="w-full h-60 object-cover" />
    <div className="p-4 bg-white">
      <h3 className="font-black text-2xl text-black">{boxer.name}</h3>
      <p className="mt-1 text-sm text-gray-800">Record: {boxer.record}</p>
      <p className="mt-2 text-sm text-green-700 font-bold">{boxer.achievements}</p>
    </div>
  </div>
);

// Main component
const Mexico: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const key = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!key) throw new Error("API key missing");
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=boxeo+mexicano&type=video&maxResults=10&key=${key}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setVideos(data.items);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white text-black font-sans">
      <div className="container mx-auto p-6 border-8 border-black shadow-[12px_12px_0_0]">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-7xl font-black uppercase inline-block px-6 py-3 border-[12px] border-green-600 bg-white text-black">
            Boxeo Mexicano
          </h1>
          <div className="flex justify-center mt-6 space-x-3">
            <span className="w-12 h-4 bg-green-600"></span>
            <span className="w-12 h-4 bg-white border-2 border-black"></span>
            <span className="w-12 h-4 bg-red-600"></span>
          </div>
          <p className="mt-4 text-2xl italic text-red-700">La fuerza y legado del boxeo azteca</p>
        </header>

        {/* Top Boxers */}
        <section className="mb-16">
          <h2 className="text-5xl font-black uppercase border-l-[12px] border-red-600 pl-6 mb-8">
            Top 5 Boxeadores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {topBoxers.map((b, i) => <BoxerCard key={b.id} boxer={b} rank={i+1} />)}
          </div>
        </section>

        {/* Videos */}
        <section>
          <h2 className="text-5xl font-black uppercase border-l-[12px] border-green-600 pl-6 mb-8">
            Videos Destacados
          </h2>
          {loading && <p className="text-center font-black text-2xl animate-pulse text-red-700">Cargando...</p>}
          {error && <p className="text-center font-black text-2xl text-red-700">Error: {error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {videos.map(v => <VideoCard key={v.id.videoId} video={v} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mexico;