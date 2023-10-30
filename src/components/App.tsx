import Game from "./Game";
import Header from "./Header";
import '../styles/App.css';
import { GlobalSettingsContext, useGlobalSettings } from "../hooks/useGlobalSettings";
import { StatisticsContext, useStatistics } from "../hooks/useStatistics";
import { UnderlinePositionProvider } from "../hooks/useUnderlinePosition";

function App() {
  const globalSettings = useGlobalSettings();
  const statistics = useStatistics();

  return (
    <StatisticsContext.Provider value={statistics}>
    <GlobalSettingsContext.Provider value={globalSettings}>
    <UnderlinePositionProvider>

      <div className="app-container">
        <Header />
        <Game />
      </div>

    </UnderlinePositionProvider>
    </GlobalSettingsContext.Provider>
    </StatisticsContext.Provider>
  );
}

export default App;
