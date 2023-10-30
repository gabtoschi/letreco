import { GuessLetter } from './game.model';

export interface GuessListProps {
  guesses: GuessLetter[][];
}

export interface GuessLetterViewProps extends GuessLetter {
  plusSign?: boolean;
  marginRight?: boolean;
}