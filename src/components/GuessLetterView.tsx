import { GuessLetterViewProps } from "../models";
import '../styles/GuessLetterView.css';

function GuessLetterView(props: GuessLetterViewProps) {
  const className = "letter-wrapper rounded d-flex justify-content-center align-items-center "
    + props.state
    + ( !!props.marginRight ? ' me-2' : '' );

  return (
    <div className={className}>
      {props.letter}
    </div>
  );
}

export default GuessLetterView;