// Data
import { ThemeProvider } from "@mui/material/styles";
import { topFightersData } from "./data/topFightersList";
import { topEventsList } from "./data/topEventsList";
import { mainEventFights } from "./data/allEventsList";

// Components
import CountryPage from "@/components/CountryPage/CountryPage";

// Config
import { mexicoConfig } from "./config/mexico.config";
import { theme } from "./config/mexicoTheme";

const Mexico = () => {
  return (
    <ThemeProvider theme={theme}>
      <CountryPage
        config={mexicoConfig}
        topFightersData={topFightersData}
        topEventsList={topEventsList}
        mainEventFights={mainEventFights}
      />
    </ThemeProvider>
  );
};

export default Mexico;
