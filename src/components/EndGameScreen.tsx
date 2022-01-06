import { EndGameScreenProps } from '../models';
import '../styles/EndGameScreen.css';

const EMOJI_MAP = {
  'right': '🟩',
  'displaced': '🟨',
  'wrong': '🟥',
  'typing': '',
  'disabled': '',
  'wordlistError': '',
}

function EndGameScreen(props: EndGameScreenProps) {
  const handleShareButton = () => {
    let message = `@MeuLetreco ${props.dailyWord.edition} (${props.guesses.length}/6)\n\n`;

    message += props.guesses.map(guess => {
      return guess.map(letter => EMOJI_MAP[letter.state]).join('') + '\n';
    }).join('');

    message += '\njogue agora em gabtoschi.com/letreco'

    if (navigator.canShare()) {
      navigator.share({
        text: message,
      });
    }
  }

  return (
    <div className="overlay-screen d-flex justify-content-center align-items-center">
      <div className='overlay rounded p-3'>
        <h1 className='text-center mb-3'>Você {props.isGameWon ? 'acertou!' : 'não conseguiu...'}</h1>
        <p className='text-center mb-1'>o Letreco do dia era: <b>{props.dailyWord.word}</b></p>
        <p className='text-center mb-3'>você usou <b>{props.guesses.length} de 6</b> tentativas</p>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            className='mb-2'
            onClick={handleShareButton}
          >
            COMPARTILHAR
          </button>
          <button>VOLTAR</button>
        </div>
      </div>
    </div>
  )
}

export default EndGameScreen;