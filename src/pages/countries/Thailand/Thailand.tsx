// Data
import { topFightersData } from "./data/topFightersList";
import { topEvents } from "./data/topEventsList";
import { mainEventFights } from "./data/mainEventsList";

// Components
import CountryPage from "@components/CountryPage/CountryPage";

// Config
import { thailandConfig } from "@/config/countries";

const Thailand = () => {
  return (
    <CountryPage
      config={thailandConfig}
      topFightersData={topFightersData}
      topEventsList={topEvents}
      mainEventFights={mainEventFights}
    />
  );
};

export default Thailand;
