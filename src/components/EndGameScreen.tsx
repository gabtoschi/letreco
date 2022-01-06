import React from 'react';
import { EndGameScreenProps, EndGameScreenState } from '../models';
import '../styles/EndGameScreen.css';

const EMOJI_MAP = {
  'right': '🟩',
  'displaced': '🟨',
  'wrong': '🟥',
  'typing': '',
  'disabled': '',
  'wordlistError': '',
}

class EndGameScreen extends React.Component<EndGameScreenProps, EndGameScreenState> {
  constructor(props: EndGameScreenProps) {
    super(props);

    this.state = {
      isResultCopied: false,
      message: this.createMessage(),
    }
  }

  canShare(): boolean {
    return navigator.canShare && navigator.canShare({ text: '' });
  }

  createMessage(): string {
    let message = `@MeuLetreco ${this.props.dailyWord.edition} (${this.props.guesses.length}/6)\n\n`;

    message += this.props.guesses.map(guess => {
      return guess.map(letter => EMOJI_MAP[letter.state]).join('') + '\n';
    }).join('');

    message += '\njogue agora em gabtoschi.com/letreco';

    return message;
  }

  handleShareButton() {
    const shareData = { text: this.state.message };

    if (this.canShare()) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(this.state.message);
      this.setState({
        isResultCopied: true,
      })
    }
  }

  render() {
    let shareButtonText = 'COMPARTILHAR';
    if (!this.canShare()) {
      shareButtonText = this.state.isResultCopied ? 'COPIADO' : 'COPIAR RESULTADO';
    }

    return (
      <div className="overlay-screen d-flex justify-content-center align-items-center">
        <div className='overlay rounded p-3'>
          <h1 className='text-center mb-3'>Você {this.props.isGameWon ? 'acertou!' : 'não conseguiu...'}</h1>
          <p className='text-center mb-1'>o Letreco do dia era: <b>{this.props.dailyWord.word}</b></p>
          <p className='text-center mb-3'>você usou <b>{this.props.guesses.length} de 6</b> tentativas</p>

          <div className="d-flex flex-column justify-content-center align-items-center">
            <button
              className='mb-2'
              onClick={() => this.handleShareButton()}
            >
              {shareButtonText}
            </button>
            <button>VOLTAR</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EndGameScreen;