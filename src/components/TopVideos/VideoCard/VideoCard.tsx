import type { TopVideoType } from '../../../types/VideoContentType'

const VideoCard: React.FC<{ video: TopVideoType }> = ({ video }) => (
  <a
    href={`https://www.youtube.com/watch?v=${video.idYt}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white flex flex-col border-4 border-black shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#16A34A] transition-all duration-300 max-w-sm"
  >
    <div className="overflow-hidden border-b-4 border-black">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-bold text-lg uppercase flex-grow mb-4">{video.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {video.tags.map((tag:string, index:number) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs font-bold uppercase border-2 border-black shadow-[4px_4px_0_#000] 
              ${
                index % 3 === 0
                  ? 'bg-green-600 text-white'
                  : index % 3 === 1
                  ? 'bg-white text-black'
                  : 'bg-red-600 text-white'
              }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto text-red-600 font-bold self-end uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        Ver Video <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </div>
  </a>
);

export default VideoCard;