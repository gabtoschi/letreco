import { useContext } from "react";
import { BsCheckLg, BsFillBackspaceFill } from "react-icons/bs";
import { GlobalSettingsContext, GlobalSettingsHook } from "../hooks/useGlobalSettings";
import { KeyboardButtonProps } from "../models";
import '../styles/KeyboardButton.css';

const mapIcon: { [icon: string]: () => JSX.Element } = {
  'back': () => (<BsFillBackspaceFill />),
  'enter': () => (<BsCheckLg />),
};

function KeyboardButton(props: KeyboardButtonProps) {
  const [{isColorblindModeActive}] = useContext<GlobalSettingsHook>(GlobalSettingsContext);

  let className = 'keyboard-button rounded';
  if (props.extraClasses) className += ' ' + props.extraClasses;
  if (props.isLetter) className += ' letter-button';
  if (props.isAction) className += ' action-button';
  if (props.stateClass) className += ' ' + props.stateClass;

  if (isColorblindModeActive) className += ' colorblind';

  let content = <span>{props.label}</span>;
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