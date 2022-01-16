import Game from "./Game";
import Header from "./Header";
import '../styles/App.css';
import { GlobalSettingsContext, useGlobalSettings } from "../hooks/useGlobalSettings";
import { StatisticsContext, useStatistics } from "../hooks/useStatistics";

function App() {
  const globalSettings = useGlobalSettings();
  const statistics = useStatistics();

  return (
    <StatisticsContext.Provider value={statistics}>
    <GlobalSettingsContext.Provider value={globalSettings}>

      <div className="app-container">
        <Header />
        <Game />
      </div>

    </GlobalSettingsContext.Provider>
    </StatisticsContext.Provider>
  );
}

export default App;
