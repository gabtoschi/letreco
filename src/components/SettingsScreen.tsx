import Overlay from "./Overlay";
import '../styles/SettingsScreen.css';
import { SettingsScreenProps } from "../models";
import Button from "./Button";
import { useContext } from "react";
import { GlobalSettingsContext } from "../hooks/useGlobalSettings";

const SOCIAL_URLS = [
  { label: 'Twitter', url: 'https://twitter.com/meuletreco'},
  { label: 'Telegram', url: 'https://t.me/MeuLetreco'},
  { label: 'Backloggd', url: 'https://www.backloggd.com/games/letreco/'},
]

function SettingsScreen({
  handleCloseScreen,
}: SettingsScreenProps) {
  const [{
    isColorblindModeActive,
  }, setGlobalSettings] = useContext(GlobalSettingsContext);

  const handleUrlOpen = (url: string) => {
    window.open(url, '_blank');
  }

  const getActiveString = (isActive: boolean): string =>
    (isActive ? 'ATIVADO' : 'DESATIVADO');

  const getActiveButtonLabel = (isActive: boolean): string =>
    (isActive ? 'DESATIVAR' : 'ATIVAR');

  return <Overlay content={
    <div className="content text-center">
      <h3>Modo daltônico</h3>
      <p>Altera as cores das dicas. O modo está <b>{getActiveString(isColorblindModeActive)}</b>.</p>
      <Button
        label={getActiveButtonLabel(isColorblindModeActive)}
        onClick={() => {setGlobalSettings({ isColorblindModeActive: !isColorblindModeActive })}}
      />

      <hr/>

      <h3>Siga o Letreco!</h3>
      {
        SOCIAL_URLS.map(({label, url}, index) => (
          <Button
            key={label}
            label={label}
            onClick={() => handleUrlOpen(url)}
            className={index !== SOCIAL_URLS.length - 1 ? 'me-2' : ''}
          />
        ))
      }

      <hr/>

      <div className="d-flex align-items-center justify-content-center">
          <Button
            onClick={handleCloseScreen}
            label='FECHAR'
          />
        </div>
    </div>
  } />
}

export default SettingsScreen;