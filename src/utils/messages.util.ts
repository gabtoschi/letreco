import { GuessLetter } from './../models/game.model';

const NORMAL_MODE_EMOJIS = {
  'right': '🟩',
  'displaced': '🟨',
  'wrong': '🟥',
  'typing': '',
  'disabled': '',
  'wordlistError': '',
}

export function getNormalEndGameMessage(
  edition: string,
  guesses: GuessLetter[][],
  isGameWon: boolean,
  currentStrike: number,
): string {
  let message = `${edition} (${isGameWon ? guesses.length : 'X'}/6) @MeuLetreco \n\n`;

  if (currentStrike > 1) {
    message += '\nSequência atual: ' + currentStrike.toString();
  }

  message += guesses.map(guess => {
    return guess.map(letter => NORMAL_MODE_EMOJIS[letter.state]).join('') + '\n';
  }).join('');

  message += '\njogue agora em gabtoschi.com/letreco';

  return message;
}
