import type { TopVideoType } from "../../types/VideoContentType";
import VideoCard from "./VideoCard";

type TopVideosProps = {
  videos: TopVideoType[];
};

const TopVideos = ({ videos }: TopVideosProps) => {
  return (
    <section>
      <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
        MÁS PELEAS LEGENDARIAS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(
          (video) =>
            video.idYt && video.idYt && <VideoCard key={video.idYt} video={video} />
        )}
      </div>
    </section>
  );
};

export default TopVideos;
