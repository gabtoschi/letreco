import { ButtonProps } from "../models";
import '../styles/Button.css';

function Button(props: ButtonProps) {
  return (
    <button
      className={'styled-button rounded px-2 py-1 ' + (props.className || '')}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default Button;