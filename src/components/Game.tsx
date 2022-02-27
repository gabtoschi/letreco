import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GuessDistributionKeys, StatisticsContext } from '../hooks/useStatistics';
import { DailyWord, GuessLetter, GuessLetterState, GuessValidationResult, KeyboardButtonStates, KeyboardLetterStates, SavedDailyGame } from '../models';
import { getDailyWord, getLast, getToday, wordList } from '../utils';
import EndGameScreen from './EndGameScreen';
import GuessList from './GuessList';
import Keyboard from './Keyboard';

export const WORD_SIZE = 5;
export const GUESS_LIST_SIZE = 6;

export const KEY_BACKSPACE = 'Backspace';
export const KEY_ENTER = 'Enter';
export const KEY_LETTERS = 'abcdefghijklmnopqrstuvwxyz';

export const GAME_END_DELAY = 0.8 * 1000;

export const SAVED_GAME_KEY = 'savedGame';
export const SAVED_GAME_INIT: SavedDailyGame = {
  date: getToday(),
  guesses: [[]],
  winState: { isGameEnded: false, isGameWon: false },
  letterStates: {},
}

const BUTTON_STATES_INIT: KeyboardButtonStates = {
  letters: true,
  back: false,
  enter: false,
}

const updateKeyboardButtonStates = (guesses: GuessLetter[][]): KeyboardButtonStates => {
  const lastGuess = getLast(guesses || [[]]);

  return {
    letters: lastGuess.length < WORD_SIZE,
    back: lastGuess.length > 0,
    enter: lastGuess.length === WORD_SIZE,
  }
}

function Game() {
  const [statistics, setStatistics] = useContext(StatisticsContext);

  const [{
    date: savedDate, guesses, winState, letterStates,
  }, setSavedGame] = useLocalStorage(SAVED_GAME_KEY, SAVED_GAME_INIT);

  const [buttonStates, setButtonStates] = useState<KeyboardButtonStates>(
    updateKeyboardButtonStates(guesses)
  );

  if (savedDate !== getToday()) {
    setButtonStates(BUTTON_STATES_INIT);
    setSavedGame(SAVED_GAME_INIT);
  }

  const [isEndGameScreenOpen, setIsEndGameScreenOpen] = useState<boolean>(false);

  const dailyWord = useMemo<DailyWord>(() => getDailyWord(), []);


  const updateStatistics = (isGameWon: boolean, guessesAmount: number) => {
    const newStreak = isGameWon ? statistics.currentStreak + 1 : 0;
    console.log(newStreak);

    const guessResult = (isGameWon ? guessesAmount.toString() : 'X') as GuessDistributionKeys;

    const newDistribution = { ...statistics.distribution };
    newDistribution[guessResult] += 1;

    setStatistics({
      distribution: newDistribution,
      currentStreak: newStreak,
      maxStreak: newStreak > statistics.maxStreak ? newStreak : statistics.maxStreak,
    });
  }

  const updateLastGuess = (newGuess: GuessLetter[]): GuessLetter[][] => {
    return [...guesses.slice(0, guesses.length - 1), newGuess];
  }

  const isLastGuessInWordList = (): boolean => {
    const lastGuessWord = getLast(guesses)
      .map(guess => guess.letter)
      .join('');

    return wordList.includes(lastGuessWord);
  }

  const updateLetterState = (states: KeyboardLetterStates, letter: string, newState: GuessLetterState) => {
    if (states[letter]) {
      if (states[letter] === 'right') return;
      if (states[letter] === 'displaced' && newState === 'wrong') return;
    }

    states[letter] = newState;
  }

  const validateLastGuess = (): GuessValidationResult => {
    const lastGuess = getLast(guesses);
    const dailyWordLetters = dailyWord.word.split('');

    const missingLetters = [];
    const validatedGuess: GuessLetter[] = [];

    const newLetterStates = { ...letterStates } as KeyboardLetterStates;

    let isRightGuess = false;

    for (let i = 0; i < WORD_SIZE; i++) {
      const letterState = lastGuess[i].letter === dailyWordLetters[i] ? 'right' : 'wrong';

      validatedGuess.push({
        letter: lastGuess[i].letter,
        state: letterState,
      });

      if (letterState === 'wrong') missingLetters.push(dailyWordLetters[i]);
    }

    isRightGuess = missingLetters.length <= 0;

    if (missingLetters.length) {
      const wrongLetters = validatedGuess.filter(guess => guess.state === 'wrong');

      for (let guessLetter of wrongLetters) {
        const indexOnMissingLetters = missingLetters.indexOf(guessLetter.letter);

        if (indexOnMissingLetters !== -1) {
          guessLetter.state = 'displaced';
          missingLetters.splice(indexOnMissingLetters, 1);
        }
      }
    }

    for (const guessLetter of validatedGuess) {
      updateLetterState(newLetterStates, guessLetter.letter, guessLetter.state);
    }

    return {
      validatedGuess, letterStates: newLetterStates, isRightGuess,
    };
  }

  const handleKeyboardLetter = (letter: string) => {
    if (winState.isGameEnded) return;

    const updatedGuesses = updateLastGuess([...getLast(guesses), { letter, state: 'typing' }]);

    setSavedGame({ guesses: updatedGuesses });
    setButtonStates(updateKeyboardButtonStates(updatedGuesses));
  }

  const handleKeyboardBack = () => {
    if (winState.isGameEnded) return;

    const lastGuess = getLast(guesses);
    const newGuess: GuessLetter[] = lastGuess
      .slice(0, lastGuess.length - 1)
      .map(oldGuess => ({ letter: oldGuess.letter, state: 'typing' }) as GuessLetter);

    const updatedGuesses = updateLastGuess(newGuess);

    setSavedGame({ guesses: updatedGuesses });
    setButtonStates(updateKeyboardButtonStates(updatedGuesses));
  }

  const handleKeyboardEnter = () => {
    if (winState.isGameEnded) return;

    if (!isLastGuessInWordList()) {
      const newGuess = getLast(guesses)
        .map(guess => ({ letter: guess.letter, state: 'wordlistError' }) as GuessLetter);

      const updatedGuesses = updateLastGuess(newGuess);

      setSavedGame({ guesses: updatedGuesses });
      setButtonStates(updateKeyboardButtonStates(updatedGuesses));

      return;
    }

    const { validatedGuess, letterStates: newLetterStates, isRightGuess } = validateLastGuess();

    if (guesses.length === GUESS_LIST_SIZE || isRightGuess) {
      const updatedGuesses = updateLastGuess(validatedGuess);

      setSavedGame({
        guesses: updatedGuesses,
        letterStates: newLetterStates,
      });

      setButtonStates(updateKeyboardButtonStates(updatedGuesses));

      setTimeout(() => {
        setSavedGame({
          guesses: updatedGuesses,
          letterStates: newLetterStates,
          winState: { isGameEnded: true, isGameWon: isRightGuess }
        });

        updateStatistics(isRightGuess, updatedGuesses.length);
        setIsEndGameScreenOpen(true);
      }, GAME_END_DELAY);

    } else {
      const updatedGuesses = [...updateLastGuess(validatedGuess), []];

      setSavedGame({
        guesses: updatedGuesses,
        letterStates: newLetterStates,
      });
      setButtonStates(updateKeyboardButtonStates(updatedGuesses));
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === KEY_BACKSPACE && buttonStates.back) {
      handleKeyboardBack();
      return;
    }

    if (event.key === KEY_ENTER && buttonStates.enter) {
      handleKeyboardEnter();
      return;
    }

    if (KEY_LETTERS.includes(event.key) && buttonStates.letters) {
      handleKeyboardLetter(event.key.toUpperCase());
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  const handleEndGameScreenClose = () => {
    setIsEndGameScreenOpen(false);
  }

  return (
    <div
      className='mt-3'
      onClick={winState.isGameEnded && !isEndGameScreenOpen ? () => setIsEndGameScreenOpen(true): undefined}
      style={{ cursor: winState.isGameEnded && !isEndGameScreenOpen ? 'pointer' : 'default' }}
    >
      {isEndGameScreenOpen && <EndGameScreen
        dailyWord={dailyWord}
        guesses={guesses}
        isGameWon={winState.isGameWon}
        currentStrike={statistics.currentStreak}
        handleCloseScreen={handleEndGameScreenClose}
      />}

      <div className='mb-4'>
        <GuessList
          guesses={guesses}
        />
      </div>

      <Keyboard
        onLetterPress={handleKeyboardLetter}
        onBackPress={handleKeyboardBack}
        onEnterPress={handleKeyboardEnter}

        buttonStates={buttonStates}
        letterStates={letterStates}
        enabled={!winState.isGameEnded}
      />
    </div>
  )
}

export default Game;