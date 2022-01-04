export type GuessLetterState = 'typing' | 'wrong' | 'displaced' | 'right';

export interface GuessLetter {
  letter: string;
  state: GuessLetterState;
}

export interface GameState {
  guesses: GuessLetter[][];
  isGameEnded: boolean;
}