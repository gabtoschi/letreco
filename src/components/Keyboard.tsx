import { KeyboardProps } from '../models';
import KeyboardButton from './KeyboardButton';

const keyboardData: string[][] = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ZXCVBNM',
].map(str => str.split(''));

function Keyboard(props: KeyboardProps) {
  const buttonLines = keyboardData.map(letterLine => {
    const buttons = letterLine.map(letter => (
      <KeyboardButton
        key={letter}
        elementKey={letter}
        label={letter}
        onClick={() => props.onLetterPress(letter)}
        enabled={props.buttonStates.letters && props.enabled}
        isLetter={true}
        stateClass={props.letterStates[letter]}
      />
    ));

    return (
      <div
        key={letterLine.join('')}
        className='d-flex justify-content-around mb-2'
      >{buttons}</div>
    );
  });

  return (
    <div className='px-lg-5 px-2'>
      <div className='mb-3 d-flex justify-content-center'>
        <KeyboardButton
          elementKey='back'
          icon='back'
          onClick={() => props.onBackPress()}
          enabled={props.buttonStates.back && props.enabled}
          isAction={true}
          extraClasses='me-3'
        />

        <KeyboardButton
          elementKey='enter'
          icon='enter'
          onClick={() => props.onEnterPress()}
          enabled={props.buttonStates.enter && props.enabled}
          isAction={true}
        />
      </div>
      {buttonLines}
    </div>
  );
}

export default Keyboard;