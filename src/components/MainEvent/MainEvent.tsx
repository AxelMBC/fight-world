import VideoMainEvent from "../VideoMainEvent";

type MainEventProps = {
  loading: boolean;
  error: string | null;
  mainVideo: any;
  fetchMainVideo: () => void;
};

const MainEvent = ({ loading, error, mainVideo, fetchMainVideo }: MainEventProps) => {
  return (
    <section className="mb-20 border-y-8 border-black py-5">
      {loading && (
        <p className="text-center font-bold text-3xl animate-pulse">
          BUSCANDO COMBATE...
        </p>
      )}
      {error && (
        <p className="text-center font-bold text-2xl text-red-600 bg-black p-4">
          {error}
        </p>
      )}
      {mainVideo && <VideoMainEvent video={mainVideo} />}
      {!loading && mainVideo && (
        <div className="text-center my-7">
          <button
            onClick={() => fetchMainVideo()}
            className="cursor-pointer bg-red-600 text-white font-anton uppercase text-2xl py-3 px-8 border-4 border-black hover:bg-black hover:text-white transition-colors duration-300 shadow-[8px_8px_0_#000]"
          >
            Buscar Otro Combate
          </button>
        </div>
      )}
    </section>
  );
};

export default MainEvent;
