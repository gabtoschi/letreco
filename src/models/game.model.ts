import { KeyboardButtonStates, KeyboardLetterStates } from ".";

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

export interface GameState {
  dailyWord: DailyWord;
  guesses: GuessLetter[][];

  isGameEnded: boolean;
  isGameWon: boolean;
  isEndGameScreenOpen: boolean;

  keyboardButtonStates: KeyboardButtonStates;
  keyboardLetterStates: KeyboardLetterStates;
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

export interface EndGameScreenState {
  isResultCopied: boolean;
  message: string;
}