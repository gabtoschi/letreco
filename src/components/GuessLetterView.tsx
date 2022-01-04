import { GuessLetterViewProps } from "../models";
import '../styles/GuessLetterView.css';

function GuessLetterView(props: GuessLetterViewProps) {
  return (
    <div className="letter-wrapper d-flex justify-content-center align-items-center">
      {props.letter}
    </div>
  );
}

export default GuessLetterView;