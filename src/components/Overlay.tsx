import { OverlayProps } from "../models";
import '../styles/Overlay.css';

function Overlay(props: OverlayProps) {
  return (
    <div className="overlay-screen d-flex justify-content-center align-items-center">
      <div className='overlay rounded p-3'>
        {props.content}
      </div>
    </div>
  );
}

export default Overlay;