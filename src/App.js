import React, { Component } from 'react';
import './App.css';
import KeyHandler from './components/KeyHandler';
import TypingScene from './scenes/Typing/';

class App extends Component {

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    console.log(event);
  }

  render() {
    return (
      <div>
        <TypingScene />
      </div>
    );
  }
}

export default App;
