import Game from "./Game";
import Header from "./Header";
import '../styles/App.css';
import { GlobalSettingsContext, useGlobalSettings } from "../hooks/useGlobalSettings";

function App() {
  const globalSettings = useGlobalSettings();

  return (
    <GlobalSettingsContext.Provider value={globalSettings}>
      <div className="app-container">
        <Header />
        <Game />
      </div>
    </GlobalSettingsContext.Provider>
  );
}

export default App;
