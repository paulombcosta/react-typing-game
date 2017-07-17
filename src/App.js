import React, { Component } from 'react';
import './App.css';
import TypingScene from './scenes/Typing/';
import StatisticsScene from './scenes/Statistics/';
import { connect } from 'react-redux';
import { keyTyped, spaceTyped, tick } from './actions';
import keyDispatcher from './services/key_dispatcher';
import { STARTED } from './services/application_status';

class App extends Component {

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    keyDispatcher(event, this.props.keyTyped, this.props.currentPosition, this.props.spaceTyped);
    this.startCountdownTimer();
  }

  startCountdownTimer() {
    if (this.props.applicationStatus === STARTED && this.timerActive === undefined) {
      console.log("COUNTDOWN STARTED")
      this.timerActive = true;
      setInterval(() => {
        this.props.tick();
      }, 1000);
    }
  }

  render() {
    return (
      <div className="app-container">
        <StatisticsScene />
        <TypingScene />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        currentPosition: state.appState.currentPosition,
        applicationStatus: state.appState.applicationStatus
    };
}

export default connect(mapStateToProps, { keyTyped, spaceTyped, tick })(App);