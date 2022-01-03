import React from 'react';
import { KeyboardProps } from '../models';

const keyboardData: string[][] = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ZXCVBNM',
].map(str => str.split(''));

function Keyboard(props: KeyboardProps) {
  const buttonLines = keyboardData.map(letterLine => {
    const buttons = letterLine.map(letter => (
      <button
        key={letter}
        onClick={() => props.onLetterPress(letter)}
        disabled={!props.buttonStates.letters || !props.enabled}
      >
        {letter}
      </button>
    ));

    return (
      <div key={letterLine.join('')}>{buttons}</div>
    );
  });

  return (
    <div>
      <div>
        <button
          onClick={() => props.onEnterPress()}
          disabled={!props.buttonStates.enter || !props.enabled}
        >
          ENTER
        </button>

        <button
          onClick={() => props.onBackPress()}
          disabled={!props.buttonStates.back || !props.enabled}
        >
          BACK
        </button>
      </div>
      {buttonLines}
    </div>
  );
}

export default Keyboard;