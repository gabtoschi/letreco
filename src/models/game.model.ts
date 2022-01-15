import { KeyboardLetterStates } from ".";

export type GuessLetterState =
  'typing' |
  'wrong' |
  'displaced' |
  'right' |
  'disabled' |
  'wordlistError';

export interface GuessLetter {
  letter: string;
  state: GuessLetterState;
}

export interface DailyWord {
  edition: string;
  date: string;
  word: string;
}

export interface DailyWordDatabase {
  [date: string]: DailyWord;
}

export interface GameWinState {
  isGameEnded: boolean;
  isGameWon: boolean;
}

export interface GuessValidationResult {
  validatedGuess: GuessLetter[];
  letterStates: KeyboardLetterStates;
  isRightGuess: boolean;
}

export interface EndGameScreenProps {
  dailyWord: DailyWord;
  isGameWon: boolean;
  guesses: GuessLetter[][];
  handleCloseScreen: () => void;
}

export interface SavedDailyGame {
  date: string;
  guesses: GuessLetter[][];
  winState: GameWinState;
  letterStates: KeyboardLetterStates;
}