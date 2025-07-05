import type { MainEventType } from '../../../types/VideoContentType';

const MainEventVideo: React.FC<{ video: MainEventType }> = ({ video }) => (
  <div className="bg-white p-4 border-4 border-black shadow-[10px_10px_0_#000]">
    <div className="border-4 border-black">
      <iframe
        src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1`}
        title={video.snippet.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ height: '500px', width: '100%' }}
      ></iframe>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl md:text-4xl font-anton uppercase">{video.snippet.title}</h3>
      <p className="mt-2 text-gray-700">{video.snippet.description}</p>
    </div>
  </div>
);

export default MainEventVideo;