import Game from "./Game";
import Header from "./Header";
import "../styles/App.css";
import {
  GlobalSettingsContext,
  useGlobalSettings,
} from "../hooks/useGlobalSettings";
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

          <a
            className="mt-5 w-100 d-flex justify-content-center align-items-center"
            href="https://catarse.me/piquinim2"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-100 mb-2"
              src="/letreco/piquinim.png"
              alt="Conheça a Coleção Piquinim, jogos de tabuleiro que cabem no bolso!"
            />
          </a>
        </div>
      </GlobalSettingsContext.Provider>
    </StatisticsContext.Provider>
  );
}

export default App;
