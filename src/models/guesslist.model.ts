import { GuessLetter } from './game.model';

export interface GuessListProps {
  guesses: GuessLetter[][];
}

export interface GuessLetterViewProps extends GuessLetter {
  index? : number,
  marginRight?: boolean;
}