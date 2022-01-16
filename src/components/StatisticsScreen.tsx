import { OverlayScreenProps } from "../models";
import Overlay from "./Overlay";
import '../styles/SettingsScreen.css';
import { StatisticsView } from "./StatisticsView";
import Button from "./Button";

export function StatisticsScreen({
  handleCloseScreen,
}: OverlayScreenProps) {

  return <Overlay content={
    <div className="content">
      <div className="container">
        <StatisticsView />
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <Button
          onClick={handleCloseScreen}
          label='FECHAR'
        />
      </div>
    </div>
  }/>
};