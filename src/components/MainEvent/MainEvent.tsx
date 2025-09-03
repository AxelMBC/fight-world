import type { mainEventType } from "../../types/fightEventType";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";

import MainEventCard from "./MainEventCard";

type MainEventProps = {
  loading: boolean;
  error: string | null;
  mainVideo: mainEventType | null;
  fetchMainVideo: () => void;
};

const MainEvent = ({
  loading,
  error,
  mainVideo,
  fetchMainVideo,
}: MainEventProps) => {
  return (
    <section className="section-spacing border-y-8 border-black py-5">
      {loading && (
        <p className="text-center font-bold text-3xl fc-primary">
          BUSCANDO COMBATE...
        </p>
      )}
      {error && (
        <p className="fc-error text-center font-bold text-2xl p-4">
          {error}
        </p>
      )}
      {mainVideo && <MainEventCard video={mainVideo} />}
      {!loading && mainVideo && (
        <div className="text-center my-7">
          <button
            id="fetch-another-fight"
            onClick={() => fetchMainVideo()}
            className="fc-white button-font cursor-pointer font-anton uppercase text-2xl py-3 px-8 border-4 border-black"
          >
            <span className="me-2">
              <FontAwesomeIcon icon={faDiceThree} />
            </span>
            Buscar Otro Combate
          </button>
        </div>
      )}
    </section>
  );
};

export default MainEvent;
