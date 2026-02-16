// Config
import { theme } from "./config/mexicoTheme";
import { mexicoConfig } from "./config/mexico.config";

// Data
import { topFightersData } from "./data/topFightersList";
import { topEventsList } from "./data/topEventsList";
import { mainEventFights } from "./data/allEventsList";

// Components
import CountryPage from "@/components/CountryPage/CountryPage";

const Mexico = () => {
  return (
    <CountryPage
      theme={theme}
      config={mexicoConfig}
      topFightersData={topFightersData}
      topEventsList={topEventsList}
      mainEventFights={mainEventFights}
    />
  );
};

export default Mexico;
