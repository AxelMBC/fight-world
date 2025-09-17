import type { mainEventType } from "../../../types/fightEventType";

interface EventCardProps {
  video: mainEventType;
  onVideoSelect: (event: mainEventType) => void;
}

const EventCard = ({ video, onVideoSelect }: EventCardProps) => {
  const handleVideoClick = () => {
    onVideoSelect(video);
  };

  return (
    <div
      onClick={() => handleVideoClick()}
      className="group bg-white flex flex-col border-4 border-black shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#ca2626] transition-all duration-300 max-w-sm cursor-pointer"
    >
      <div className="overflow-hidden border-b-4 border-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover filter lg:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg uppercase flex-grow mb-4">
          {video.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {video.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-bold uppercase border-2 border-black shadow-[4px_4px_0_#000] 
              ${
                index % 3 === 0
                  ? "bg-primary fc-white"
                  : index % 3 === 1
                  ? "bg-white fc-black"
                  : "bg-secondary-dark fc-white"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto fc-primary font-bold self-end uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Ver Video{" "}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
