import React, { Component } from 'react';
import './App.css';
import TypingScene from './scenes/Typing/';
import StatisticsScene from './scenes/Statistics/';
import RestartScene from './scenes/Restart';
import { connect } from 'react-redux';
import { keyTyped, spaceTyped, tick } from './actions';
import keyDispatcher from './services/key_dispatcher';
import { STARTED, FINISHED } from './services/application_status';

class App extends Component {

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (this.props.applicationStatus !== FINISHED) {
      keyDispatcher(event, this.props.keyTyped, this.props.currentPosition, this.props.spaceTyped);
    }
    this.handleCountdownTimer();
  }

  handleCountdownTimer() {
    if (this.props.applicationStatus === STARTED && this.timeIntervalId === undefined) {
      console.log("COUNTDOWN STARTED")
      this.timeIntervalId = setInterval(() => {
        this.props.tick();
      }, 1000);
    }
    if (this.props.applicationStatus === FINISHED && this.timeIntervalId !== undefined) {
      clearInterval(this.timeIntervalId);
      this.timeIntervalId = null;
    }
  }

  render() {
    return (
      <div className="app-container">
        <StatisticsScene />
        <TypingScene />
        <RestartScene />
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