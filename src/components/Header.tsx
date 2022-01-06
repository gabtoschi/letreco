import React from 'react';
import '../styles/Header.css';
import { BsFillQuestionSquareFill, BsTwitter } from "react-icons/bs"
import HowToPlayScreen from './HowToPlayScreen';
import { HeaderState } from '../models/header.model';

const TWITTER_URL = 'https://twitter.com/meuletreco';

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

    return (
      <div className="mt-3 mb-4 d-flex align-items-center justify-content-around container">
        {howToPlayScreen}

        <button
          className='header-button'
          onClick={() => this.handleHowToPlayButton()}
        >
          <BsFillQuestionSquareFill />
        </button>

        <h1 className="text-center mb-0">LETRECO</h1>

        <button
          className='header-button'
          onClick={() => this.handleTwitterButton()}
        >
          <BsTwitter />
        </button>
      </div>
    );
  }
}

export default Header;