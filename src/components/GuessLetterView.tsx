import { useContext } from "react";
import { GlobalSettingsContext } from "../hooks/useGlobalSettings";
import { useUnderlinePosition } from "../hooks/useUnderlinePosition";
import { GuessLetterViewProps } from "../models";
import '../styles/GuessLetterView.css';

function GuessLetterView(props: GuessLetterViewProps) {
  const { underlinePosition, setSpecificUnderlinePosition } = useUnderlinePosition();
  const [{isColorblindModeActive}] = useContext(GlobalSettingsContext);

  const getAlign = () : string => {
    return props.letter ? "justify-content-center" : "justify-content-end";
  }

  const isValidaState = () : boolean => {
    const validStates = [undefined, "typing", "wordlistError"];
    return validStates.includes(props.state);
  }

  const canAddUnderscore = () : boolean => {
    if (underlinePosition !== props.index) return false;

    return isValidaState();
  }

  const onClick = () : void => {
    if(props.index === undefined) return;
    if(!isValidaState()) return;

    setSpecificUnderlinePosition(props.index);
  }

  const className = `letter-wrapper rounded d-flex ${getAlign()} align-items-center `
    + `${props.state && props.state}`
    + ( !!props.marginRight ? ' me-2' : '' )
    + ( isColorblindModeActive ? ' colorblind': '' );

  return (
    <div className={className} onClick={onClick}>
      {props.letter}
      {canAddUnderscore() && <div className="letter-underline-active"></div>}
    </div>
  );
}

export default GuessLetterView;