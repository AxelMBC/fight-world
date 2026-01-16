// Data
import { topFightersData } from "./data/topFightersList";
import { topEventsList } from "./data/topEventsList";
import { mainEventFights } from "./data/allEventsList";

// Components
import CountryPage from "@/components/CountryPage/CountryPage";

// Config
import { mexicoConfig } from "./config/mexico.config";

const Mexico = () => {
  return (
    <CountryPage
      config={mexicoConfig}
      topFightersData={topFightersData}
      topEventsList={topEventsList}
      mainEventFights={mainEventFights}
    />
    
  );
};

export default Mexico;
