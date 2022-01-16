import { getGuessesWords, getToday } from '.';
import { Statistics } from './../hooks/useStatistics';
import { GuessLetter, DailyWord } from './../models/game.model';

export interface TrophyValidatorData {
  isGameWon: boolean;
  guesses: GuessLetter[][];
  statistics: Statistics;
}

export interface Trophy {
  id: string;
  name: string;
  description: string;
  emoji: string;
  validator: (data: TrophyValidatorData) => boolean;
}

export interface UnlockedTrophy {
  trophyId: string;
  date: string;
  edition: string;
}

export interface TrophyMap {
  [id: string]: Trophy;
}

export const allTrophies: Trophy[] = [
  {
    id: 'winInOne',
    name: 'MUITA SORTE',
    description: 'Vença um Letreco com apenas 1 chute.',
    emoji: '🍀',
    validator: ({isGameWon, guesses}) => {
      return isGameWon && guesses.length === 1;
    }
  },
  {
    id: 'winInTwo',
    name: 'DUPLO CERTO',
    description: 'Vença um Letreco com 2 chutes.',
    emoji: '2️⃣',
    validator: ({isGameWon, guesses}) => {
      return isGameWon && guesses.length === 2;
    }
  },
  {
    id: 'winInThree',
    name: 'TENHA TRIOS',
    description: 'Vença um Letreco com 3 chutes.',
    emoji: '3️⃣',
    validator: ({isGameWon, guesses}) => {
      return isGameWon && guesses.length === 3;
    }
  },
  {
    id: 'tutorialWords',
    name: 'ÓTIMO ALUNO',
    description: 'Chute todas as palavras de exemplo do tutorial.',
    emoji: '📚',
    validator: ({guesses}) => {
      const words = getGuessesWords(guesses);
      return words.includes('CERTO') && words.includes('QUASE') && words.includes('FALHA');
    }
  },
  {
    id: 'letrecoWords',
    name: 'NOSSO JEITO',
    description: 'Use "letra" e "treco" como chutes. Obrigado pela homenagem!',
    emoji: '🕹',
    validator: ({guesses}) => {
      const words = getGuessesWords(guesses);
      return words.includes('LETRA') && words.includes('TRECO');
    }
  },
];

export const allTrophiesById: TrophyMap = allTrophies.reduce<TrophyMap>(
  (obj: TrophyMap, trophy) => {
    obj[trophy.id] = trophy;
    return obj;
  }, {} as TrophyMap,
)

export function unlockNewTrophies(
  alreadyUnlocked: UnlockedTrophy[],
  validatorData: TrophyValidatorData,
  dailyWord: DailyWord,
): UnlockedTrophy[] {
  const alreadyUnlockedIds = alreadyUnlocked.map(trophy => trophy.trophyId);
  const trophiesToValidate = allTrophies.filter(
    trophy => !alreadyUnlockedIds.includes(trophy.id));

  return trophiesToValidate
    .filter(trophy => trophy.validator(validatorData))
    .map(trophy => ({
      trophyId: trophy.id,
      date: dailyWord.date,
      edition: dailyWord.edition,
    }));
}

export function getTodayTrophies(unlocked: UnlockedTrophy[]): Trophy[] {
  return unlocked
    .filter(trophy => trophy.date === getToday())
    .map(trophy => trophy.trophyId)
    .map(trophyId => allTrophiesById[trophyId]);
}