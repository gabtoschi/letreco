import { OverlayProps } from "../models";
import '../styles/Overlay.css';

function Overlay(props: OverlayProps) {
  return (
    <div className="overlay-screen">
      <div className="overlay-wrapper">
        <div className='overlay rounded m-4 p-3'>
          {props.content}
        </div>
      </div>
    </div>
  );
}

export default Overlay;