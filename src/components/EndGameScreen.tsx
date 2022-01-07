import React from 'react';
import { EndGameScreenProps, EndGameScreenState } from '../models';
import Button from './Button';
import Overlay from './Overlay';
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
    let message = `nº ${this.props.dailyWord.edition} @MeuLetreco (${this.props.guesses.length}/6)\n\n`;

    message += this.props.guesses.map(guess => {
      return guess.map(letter => EMOJI_MAP[letter.state]).join('') + '\n';
    }).join('');

    message += '\njogue agora em gabtoschi.com/letreco';

    return message;
  }

  handleCopyButton() {
    navigator.clipboard.writeText(this.state.message);

    this.setState({
      isResultCopied: true,
    })
  }

  handleShareButton() {
    navigator.share({ text: this.state.message });
  }

  render() {
    const shareButton = this.canShare()
      ? (
        <Button
          className='mb-2'
          onClick={() => this.handleShareButton()}
          label='COMPARTILHAR'
        />
      )
      : '';

    return (
      <Overlay content={
        <div>
          <h1
            className={'text-center mb-3 ' + (this.props.isGameWon ? 'win-text' : 'lose-text')}
          >Você {this.props.isGameWon ? 'acertou!' : 'não conseguiu...'}</h1>
          <p className='text-center mb-1'>o Letreco do dia era: <b>{this.props.dailyWord.word}</b></p>
          <p className='text-center mb-3'>você usou <b>{this.props.guesses.length} de 6</b> tentativas</p>

          <div className="d-flex flex-column justify-content-center align-items-center">
            {shareButton}

            <Button
              className='mb-2'
              onClick={() => this.handleCopyButton()}
              label={this.state.isResultCopied ? 'COPIADO' : 'COPIAR RESULTADO'}
            />

            <Button
              onClick={() => this.props.handleCloseScreen()}
              label='FECHAR'
            />
          </div>
        </div>
      }/>

    );
  }
}

export default EndGameScreen;