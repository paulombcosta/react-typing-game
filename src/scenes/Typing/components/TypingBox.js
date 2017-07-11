import React, { Component } from 'react';
import { connect } from 'react-redux';

class TypingBox extends Component {

    render() {
        console.log("APP STATE", this.props.appState);
        return(
            <div className="typing">
                {this.renderWords()}
            </div>
        )
    }

    renderWords() {
        let { words, currentPosition, currentTypedWords } = this.props.appState
        return words.map((word, index) => {
            if (index === currentPosition) {
                return this.renderCurrentWord(word, currentTypedWords, index);
            } else {
                return this.renderWord(word, index);
            }
        });
    }

    renderWord(word, key) {
        return (
            <span key={key} className="word">{word}</span>
        );
    }

    renderCurrentWord(word, currentTypedWords, key) {
        let charView = [...word].map((char, index) => {
            return <span key={index}>{char}</span>;
        });
        return (
            <div key={key} className="currentWord word">
                {charView}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(TypingBox);