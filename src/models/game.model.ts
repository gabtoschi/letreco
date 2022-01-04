export type GuessLetterState = 'typing' | 'wrong' | 'displaced' | 'right' | 'disabled';

export interface GuessLetter {
  letter: string;
  state: GuessLetterState;
}

export interface GameState {
  dailyWord: string[];
  guesses: GuessLetter[][];

  isGameEnded: boolean;
  isGameWon: boolean;
}

export interface GuessValidationResult {
  validatedGuess: GuessLetter[];
  isRightGuess: boolean;
}