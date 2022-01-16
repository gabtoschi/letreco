import { GuessLetter } from './../models/game.model';

export function getGuessesWords(guesses: GuessLetter[][]): string[] {
  return guesses.map(guess => guess.map(letter => letter.letter).join(''));
}