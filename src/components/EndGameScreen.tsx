import { useContext, useMemo, useState } from 'react';
import { EndGameScreenProps } from '../models';
import Button from './Button';
import Overlay from './Overlay';
import '../styles/EndGameScreen.css';
import { getNormalEndGameMessage } from '../utils';
import { GlobalSettingsContext } from '../hooks/useGlobalSettings';
import { StatisticsView } from './StatisticsView';

function EndGameScreen(props: EndGameScreenProps) {
  const [{isColorblindModeActive}] = useContext(GlobalSettingsContext);

  const [isResultCopied, setIsResultCopied] = useState<boolean>(false);
  const message = useMemo<string>(
    () => getNormalEndGameMessage(props.dailyWord.edition, props.guesses, props.isGameWon),
    [props.dailyWord.edition, props.guesses, props.isGameWon],
  );

  const canShare = (): boolean => {
    return navigator.canShare && navigator.canShare({ text: '' });
  }

  const handleCopyButton = () => {
    navigator.clipboard.writeText(message);
    setIsResultCopied(true);
  }

  const handleShareButton = () => {
    navigator.share({ text: message });
  }

  const shareButton = canShare()
    ? (
      <Button
        className='mb-2'
        onClick={() => handleShareButton()}
        label='COMPARTILHAR'
      />
    )
    : '';

  const pixLink = 'https://nubank.com.br/cobrar/vmu98/6616a68b-1d60-4aea-9543-43e90b9da733'

  return (
    <Overlay content={
      <div className='content row'>
        <div className='col-12 col-md-6 d-flex justify-content-center align-items-center'>
          <div>
            <h1
              className={
                'text-center mb-3 '
                + (isColorblindModeActive ? 'colorblind ': '')
                + (props.isGameWon ? 'win-text' : 'lose-text')
              }
            >Você {props.isGameWon ? 'acertou!' : 'não conseguiu...'}</h1>
            <p className='text-center mb-1'>o Letreco do dia era: <b>{props.dailyWord.word}</b></p>
            <p className='text-center mb-3'>você usou <b>{props.guesses.length} de 6</b> tentativas</p>

            <div className="d-flex flex-column justify-content-center align-items-center">
              {shareButton}

              <Button
                className='mb-2'
                onClick={() => handleCopyButton()}
                label={isResultCopied ? 'COPIADO' : 'COPIAR RESULTADO'}
              />

              <Button
                onClick={() => props.handleCloseScreen()}
                label='FECHAR'
              />

              <p className='text-center mt-3'>Gostou do jogo? <a target="_blank" rel="noreferrer" href={pixLink}><b>Apoie com um Pix</b></a> esse e outros projetos meus!</p>
            </div>
          </div>
        </div>

        <div className='col-12 col-md-6 mt-4 mt-md-0'>
          <StatisticsView />
        </div>
      </div>
    }/>
  );
}

export default EndGameScreen;