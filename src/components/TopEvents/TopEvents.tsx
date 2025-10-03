import type { mainEventType } from "../../types/fightEventType";
import EventCard from "./EventCard";

type TopVideosProps = {
  title: string;
  videos: mainEventType[];
  onVideoSelect: (event: mainEventType) => void;
};

const TopEvents = ({ title, videos, onVideoSelect }: TopVideosProps) => {
  return (
    <section style={{marginTop: '120px'}} >
      <h2 className="subtitle section-spacing fc-primary-dark text-5xl md:text-7xl uppercase mb-10 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(
          (video) =>
            video.idYt &&
            video.idYt && (
              <EventCard
                key={video.idYt}
                video={video}
                onVideoSelect={onVideoSelect}
              />
            )
        )}
      </div>
    </section>
  );
};

export default TopEvents;
