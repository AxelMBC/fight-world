import VideoCard from "../VideoCard";
import { dummyVideos } from "../../pages/countries/Mexico/data/dummyVideos";

const TopVideos = () => {
  return (
    <section>
      <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
        MÁS PELEAS LEGENDARIAS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyVideos.map(
          (v) =>
            v.id && v.id.videoId && <VideoCard key={v.id.videoId} video={v} />
        )}
      </div>
    </section>
  );
};

export default TopVideos;
