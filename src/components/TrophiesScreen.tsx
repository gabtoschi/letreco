import { OverlayScreenProps } from "../models";
import Overlay from "./Overlay";
import '../styles/SettingsScreen.css';
import Button from "./Button";

export function TrophiesScreen({
  handleCloseScreen,
}: OverlayScreenProps) {

  return <Overlay content={
    <div className="content container">
      <h3 className="text-center">seus troféus secretos</h3>

      <p className="text-center">
        Durante o jogo, você poderá desbloquear <b>troféus secretos</b> do Letreco.<br/>
        Cada troféu tem uma ação específica que você precisa fazer para ganhá-lo.<br/>
        Compartilhe os seus troféus nas redes para mostrar para todo mundo!
      </p>

      <div className="row mb-4">
        <div className="col-12 col-md-6 py-2 bg-light">
          <div className="row">
            <div className="col-3 d-flex justify-content-center align-items-center">
              <h1>🕹</h1>
            </div>

            <div className="col-9">
              <div className="d-flex justify-content-center">
                <span className="text-center">NOSSO JEITO</span>
              </div>

              <div className="d-flex justify-content-center">
                <span className="text-center">12/05/2022 (012)</span>
              </div>

              <div className="d-flex">
                <span className="text-center">Use "letra" e "treco" como chutes. Obrigado pela homenagem!</span>
              </div>

              <div className="mt-2 d-flex justify-content-center align-items-center">
                <Button
                  onClick={() => {}}
                  label={'COPIAR TROFÉU'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 bg-warning">
          aaaaaaaaaa
        </div>
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