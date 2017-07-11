import React, { Component } from 'react';
import './App.css';
import TypingScene from './scenes/Typing/';
import { connect } from 'react-redux';
import { keyTyped, spaceTyped } from './actions';
import keyDispatcher from './services/key_dispatcher';

class App extends Component {

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    //this.props.keyTyped(event.key, event.keyCode);
    keyDispatcher(event, this.props.keyTyped, this.props.currentPosition, this.props.spaceTyped);
  }

  render() {
    return (
      <div>
        <TypingScene />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        currentPosition: state.appState.currentPosition
    };
}

export default connect(mapStateToProps, { keyTyped, spaceTyped })(App);