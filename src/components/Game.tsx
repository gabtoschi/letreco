import React from 'react';
import { GameState, GuessLetter, KeyboardButtonStates } from '../models';
import GuessList from './GuessList';
import Keyboard from './Keyboard';

export const WORD_SIZE = 5;
export const GUESS_LIST_SIZE = 6;

class Game extends React.Component {
  state: GameState = {
    guesses: [
      [],
    ],
    isGameEnded: false,
  }

  getLastGuess() {
    return this.state.guesses[this.state.guesses.length - 1];
  }

  updateLastGuess(newGuess: GuessLetter[]) {
    this.setState({
      guesses: [...this.state.guesses.slice(0, this.state.guesses.length - 1), newGuess],
    });
  }

  handleKeyboardLetter(letter: string) {
    this.updateLastGuess([...this.getLastGuess(), { letter, state: 'typing' }]);
  }

  handleKeyboardBack() {
    const lastGuess = this.getLastGuess();
    const newGuess = lastGuess.slice(0, lastGuess.length - 1);

    this.updateLastGuess(newGuess);
  }

  handleKeyboardEnter() {
    if (this.state.guesses.length === GUESS_LIST_SIZE) {
      this.setState({
        isGameEnded: true,
      });

      return;
    }

    this.setState({
      guesses: [...this.state.guesses, []],
    });
  }

  render() {
    const lastGuess = this.getLastGuess();

    const buttonStates: KeyboardButtonStates = {
      letters: lastGuess.length < WORD_SIZE,
      back: lastGuess.length > 0,
      enter: lastGuess.length === WORD_SIZE,
    }

    return (
      <div className='container mt-3'>
        <div className='mb-4'>
          <GuessList
            guesses={this.state.guesses}
          />
        </div>

        <Keyboard
          onLetterPress={(letter: string) => this.handleKeyboardLetter(letter)}
          onBackPress={() => this.handleKeyboardBack()}
          onEnterPress={() => this.handleKeyboardEnter()}

          buttonStates={buttonStates}
          enabled={!this.state.isGameEnded}
        />
      </div>
    )
  }
}

export default Game;