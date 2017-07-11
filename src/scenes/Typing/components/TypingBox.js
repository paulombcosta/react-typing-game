import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TYPED_CORRECTLY, TYPED_INCORRECTLY } from '../../../services/word_status';

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

    renderWord({text, status}, key) {
        return (
            <span key={key} className={this.styleWordByStatus(status)}>{text}</span>
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

    renderCurrentWord({text}, currentTypedWords, key) {
        let charView = [...text].map((char, index) => {
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