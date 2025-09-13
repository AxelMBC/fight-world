import type { mainEventType } from "../../../types/fightEventType";

const MainEventVideo: React.FC<{ video: mainEventType }> = ({ video }) => (
  <div className="bg-white p-4 border-4 border-black shadow-[10px_10px_0_#000]">
    <div className="border-4 border-black">
      <div className="relative w-full aspect-video">
        <iframe
          id="main-event-video"
          src={`https://www.youtube.com/embed/${video.idYt}?autoplay=1&mute=1${
            video.startTime ? `&start=${video.startTime}` : ""
          }`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl md:text-4xl font-anton uppercase">
        {video.title}
      </h3>
      <p className="mt-2">{video.description}</p>
    </div>
  </div>
);

export default MainEventVideo;
