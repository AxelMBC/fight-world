// Types
import type { mainEventType } from "../../../types/fightEventType";

import React, { useState, useCallback, useEffect } from "react";

// Styles
import "../../../styles/Mexico/style.css";

// Data
import { topFightersData } from "./data/topFighters";
import { topFights } from "./data/topFights";
import { mainEventFights } from "./data/mainEventFights";

// Components
import HeaderTitle from "../../../components/HeaderTitle";
import TopFighters from "../../../components/TopFighters";
import MainEvent from "../../../components/MainEvent";
import TopFigths from "../../../components/TopFights";

const Mexico: React.FC = () => {
  const [mainVideo, setMainVideo] = useState<mainEventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMainVideo = useCallback(async () => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * mainEventFights.length);
    const video = mainEventFights[randomIndex];
    mainEventFights.splice(randomIndex, 1);
    setMainVideo(video);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    fetchMainVideo();
  }, [fetchMainVideo]);

  const flag = (
    <>
      <span className="w-16 h-8 bg-[#006847]"></span>
      <span className="w-16 h-8 bg-white border-2 border-black"></span>
      <span className="w-16 h-8 bg-[#CE1126]"></span>
    </>
  );

  return (
    <>
      <div className="min-h-screen p-4 sm:p-4 font-sans">
        <div
          className="container mx-auto max-w-7xl p-4 sm:p-6 bg-white border-4 md:border-8 border-black"
          style={{ maxWidth: "1405px" }}
        >
          <HeaderTitle flag={flag} title="Boxeo al Estilo" style="MEXICANO" />
          <MainEvent
            loading={loading}
            error={error}
            mainVideo={mainVideo}
            fetchMainVideo={fetchMainVideo}
          />

          <TopFighters topFightersData={topFightersData} />

          <TopFigths videos={topFights} />
        </div>
      </div>
    </>
  );
};

export default Mexico;
