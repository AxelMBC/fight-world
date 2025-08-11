import type { mainEventType } from "../../types/fightEventType";
import FightCard from "./FightCard";

type TopVideosProps = {
  title: string;
  videos: mainEventType[];
  setMainEvent: (event: mainEventType | null) => void;
};

const TopFights = ({title, videos, setMainEvent  }: TopVideosProps) => {
  return (
    <section>
      <h2 className="text-5xl md:text-7xl font-anton uppercase mb-10 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(
          (video) =>
            video.idYt && video.idYt && <FightCard key={video.idYt} video={video} setMainEvent={setMainEvent} />
        )}
      </div>
    </section>
  );
};

export default TopFights;
