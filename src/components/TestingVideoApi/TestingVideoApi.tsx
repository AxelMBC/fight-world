import React, { useState, useEffect } from "react";
import "../../index.css";

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

const TestingVideoApi: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("API Key:", import.meta.env.VITE_GOOGLE_API_KEY); // Debug the variable

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        if (!apiKey) {
          throw new Error(
            "API key is missing. Please set VITE_GOOGLE_API_KEY in your .env file."
          );
        }
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=boxeo+mexicano&type=video&maxResults=10&key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch videos: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.items) {
          throw new Error("No videos found in the response.");
        }
        setVideos(data.items);
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(
          `Error fetching videos: ${errorMessage}. Please check your API key and try again.`
        );
        console.error("Fetch error:", err);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold text-center mb-6">
        Boxeo Mexicano Videos
      </h1>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{video.snippet.title}</h2>
              <p className="text-gray-600 text-sm">
                {video.snippet.description.slice(0, 100)}...
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingVideoApi;
