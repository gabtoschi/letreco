export interface KeyboardButtonStates {
  letters: boolean,
  back: boolean,
  enter: boolean,
}

export interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  onBackPress: () => void;
  onEnterPress: () => void;

  enabled: boolean;
  buttonStates: KeyboardButtonStates;
}
