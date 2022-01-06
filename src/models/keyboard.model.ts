import { GuessLetterState } from ".";

export interface KeyboardButtonStates {
  letters: boolean,
  back: boolean,
  enter: boolean,
}

export interface KeyboardLetterStates {
  [letter: string]: GuessLetterState;
}

export interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  onBackPress: () => void;
  onEnterPress: () => void;

  enabled: boolean;
  buttonStates: KeyboardButtonStates;
  letterStates: KeyboardLetterStates;
}

export type KeyboardButtonIcon = 'back' | 'enter';

export interface KeyboardButtonProps {
  elementKey: string;
  onClick: () => void;

  label?: string;
  icon?: KeyboardButtonIcon;

  enabled: boolean;
  isLetter?: boolean;
  isAction?: boolean;

  stateClass?: string;
  extraClasses?: string;
}