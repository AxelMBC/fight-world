import type { YouTubeVideo } from '../../../../types/YoutubeVideo'

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

export default VideoCard;