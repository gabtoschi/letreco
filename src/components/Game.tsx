import React from 'react';
import { GameState, KeyboardButtonStates } from '../models';
import Keyboard from './Keyboard';

const WORD_SIZE = 5;
const GUESS_LIST_SIZE = 6;

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

  updateLastGuess(newGuess: string[]) {
    this.setState({
      guesses: [...this.state.guesses.slice(0, this.state.guesses.length - 1), newGuess],
    });
  }

  handleKeyboardLetter(letter: string) {
    this.updateLastGuess([...this.getLastGuess(), letter]);
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

    const allGuesses = this.state.guesses
      .map(guess => guess.join(''))
      .map(guess => <div key={guess}>{guess}</div>)

    return (
      <div>
        <div>
          {allGuesses}
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