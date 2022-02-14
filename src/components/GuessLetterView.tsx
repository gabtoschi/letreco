import { useContext } from "react";
import { GlobalSettingsContext } from "../hooks/useGlobalSettings";
import { GuessLetterViewProps } from "../models";
import '../styles/GuessLetterView.css';

function GuessLetterView(props: GuessLetterViewProps) {
  const [{isColorblindModeActive}] = useContext(GlobalSettingsContext);

  const className = "letter-wrapper rounded d-flex justify-content-center align-items-center "
    + props.state
    + ( !!props.marginRight ? ' me-2' : '' )
    + ( isColorblindModeActive ? ' colorblind': '' );

  return (
    <div className={className}>
      {props.plusSign && <i>+</i>}
      {props.letter}
    </div>
  );
}

export default GuessLetterView;