import Game from "./Game";
import Header from "./Header";
import '../styles/App.css';
import { GlobalSettingsContext, useGlobalSettings } from "../hooks/useGlobalSettings";
import { StatisticsContext, useStatistics } from "../hooks/useStatistics";
import { SavedTrophiesContext, useTrophies } from "../hooks/useTrophies";

function App() {
  const globalSettings = useGlobalSettings();
  const statistics = useStatistics();
  const trophies = useTrophies();

  return (
    <SavedTrophiesContext.Provider value={trophies}>
    <StatisticsContext.Provider value={statistics}>
    <GlobalSettingsContext.Provider value={globalSettings}>

      <div className="app-container">
        <Header />
        <Game />
      </div>

    </GlobalSettingsContext.Provider>
    </StatisticsContext.Provider>
    </SavedTrophiesContext.Provider>
  );
}

export default App;
