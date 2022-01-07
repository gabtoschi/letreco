import React from 'react';
import '../styles/Header.css';
import { BsQuestionLg, BsTwitter } from "react-icons/bs"
import HowToPlayScreen from './HowToPlayScreen';
import { HeaderState } from '../models/header.model';
import { shuffleArray } from '../utils';

const TWITTER_URL = 'https://twitter.com/meuletreco';
const APP_NAME = 'LETRECO';
class Header extends React.Component<any, HeaderState> {
  state: HeaderState = {
    isHowToPlayOpen: false,
  }

  handleTwitterButton() {
    window.open(TWITTER_URL, '_blank');
  }

  handleHowToPlayButton() {
    this.setState({
      isHowToPlayOpen: true,
    })
  }

  handleHowToPlayClose() {
    this.setState({
      isHowToPlayOpen: false,
    });
  }

  render() {
    const howToPlayScreen = this.state.isHowToPlayOpen
      ? (
        <HowToPlayScreen
          handleCloseScreen={() => this.handleHowToPlayClose()}
        />
      ) : '';

    const shuffledIndexes = shuffleArray(Array.from(Array(APP_NAME.length).keys()));
    const appName = APP_NAME.split('').map((letter, index) => {
      let className = '';

      if (index === shuffledIndexes[0]) className = 'letter-green';
      if (index === shuffledIndexes[1]) className = 'letter-yellow';
      if (index === shuffledIndexes[2]) className = 'letter-red';

      return (<span key={index.toString()} className={className}>{letter}</span>)
    });

    return (
      <div className="mt-3 mb-4 d-flex align-items-center justify-content-around">
        {howToPlayScreen}

        <button
          className='header-button rounded d-flex align-items-center justify-content-center py-2'
          onClick={() => this.handleHowToPlayButton()}
        >
          <BsQuestionLg />
        </button>

        <h1 className="text-center mb-0 app-name">{appName}</h1>

        <button
          className='header-button rounded d-flex align-items-center justify-content-center py-2'
          onClick={() => this.handleTwitterButton()}
        >
          <BsTwitter />
        </button>
      </div>
    );
  }
}

export default Header;