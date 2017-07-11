import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYPED_CORRECTLY, TYPED_INCORRECTLY } from '../../../services/word_status';

class TypingBox extends Component {

    render() {
        console.log("APP STATE", this.props.appState);
        return(
            <div className="container">
                <div className="typing">
                    {this.renderWords()}
                </div>
            </div>
        )
    }

    renderWords() {
        let { words, currentPosition, currentTypedChars } = this.props.appState
        return words.map((word, index) => {
            if (index === currentPosition) {
                return this.renderCurrentWord(word, currentTypedChars, index);
            } else {
                return this.renderWord(word, index);
            }
        });
    }

    renderWord({text, status}, key) {
        let wordId = `word-${key}`;
        let className = `word this.styleWordByStatus(status)`;
        return (
            <span key={key} className={className} id={wordId}>{text}</span>
        );
    }

    styleWordByStatus(wordStatus) {
        switch (wordStatus) {
            case TYPED_CORRECTLY:
                return "word typed-correctly"
            case TYPED_INCORRECTLY:
                return "word typed-incorrectly";
            default:
                return "word"
        }
    }

    renderCurrentWord({text}, currentTypedChars, key) {
        let wordId = `word-${key}`;
        let charView = [...text].map((char, index) => {
            let className = `${this.styleCurrentWord(char, currentTypedChars[index])}`;
            return (
                <span
                    key={index}
                    className={className}>
                    {char}
                </span>
            );
        });
        return (
            <div key={key} className="word" id={wordId}>
                {charView}
            </div>
        );
    }

    styleCurrentWord(char, typedChar) {
        if (typedChar === undefined) {
            return ""
        } else if (char === typedChar) {
            return "typed-correctly"
        } else {
            return "typed-incorrectly"
        }
    }
}


function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(mapStateToProps, null)(TypingBox);