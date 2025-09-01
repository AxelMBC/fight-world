import type { mainEventType } from "../../types/fightEventType";
import EventCard from "./EventCard";

type TopVideosProps = {
  title: string;
  videos: mainEventType[];
  setMainEvent: (event: mainEventType | null) => void;
};

const TopEvents = ({title, videos, setMainEvent  }: TopVideosProps) => {
  return (
    <section>
      <h2 className="fc-primary-dark text-5xl md:text-7xl title-1 uppercase mb-10 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(
          (video) =>
            video.idYt && video.idYt && <EventCard key={video.idYt} video={video} setMainEvent={setMainEvent} />
        )}
      </div>
    </section>
  );
};

export default TopEvents;
