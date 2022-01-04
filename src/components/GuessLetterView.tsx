import { GuessLetterViewProps } from "../models";
import '../styles/GuessLetterView.css';

function GuessLetterView(props: GuessLetterViewProps) {
  const className = "letter-wrapper d-flex justify-content-center align-items-center "
    + props.state;

  return (
    <div className={className}>
      {props.letter}
    </div>
  );
}

export default GuessLetterView;