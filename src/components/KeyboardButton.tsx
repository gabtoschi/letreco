import { BsArrowReturnLeft, BsFillBackspaceFill } from "react-icons/bs";
import { KeyboardButtonProps } from "../models";
import '../styles/KeyboardButton.css';

const mapIcon: { [icon: string]: () => JSX.Element } = {
  'back': () => (<BsFillBackspaceFill />),
  'enter': () => (<BsArrowReturnLeft />),
};

function KeyboardButton(props: KeyboardButtonProps) {
  let className = 'keyboard-button rounded';
  if (props.extraClasses) className += ' ' + props.extraClasses;
  if (props.isLetter) className += ' letter-button';
  if (props.isAction) className += ' action-button';

  let content: JSX.Element = <span>{props.label}</span>;
  if (props.icon) content = mapIcon[props.icon]();

  return (
    <button
      className={className}
      key={props.elementKey}
      onClick={() => props.onClick()}
      disabled={!props.enabled}
    >
      {content}
    </button>
  );
}

export default KeyboardButton;